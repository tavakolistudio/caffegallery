"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { menuItems, menuCategories, type MenuCategory, type MenuItem } from "@/data/menu"
import { formatPrice } from "@/lib/formatPrice"

const ACCENT = "#1B5C38"
const ACCENT_LIGHT = "#E8EFE9"

// ─── Client-side image resize → webp blob (keeps uploads small) ─────────────────

async function resizeToWebp(file: File, maxW = 900): Promise<Blob> {
  const dataUrl: string = await new Promise((res, rej) => {
    const fr = new FileReader()
    fr.onload = () => res(fr.result as string)
    fr.onerror = rej
    fr.readAsDataURL(file)
  })
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image()
    i.onload = () => res(i)
    i.onerror = rej
    i.src = dataUrl
  })
  const scale = Math.min(1, maxW / img.width)
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)
  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")!
  ctx.drawImage(img, 0, 0, w, h)
  const blob: Blob | null = await new Promise((res) =>
    canvas.toBlob((b) => res(b), "image/webp", 0.82)
  )
  if (blob) return blob
  // Fallback: original file
  return file
}

// ─── Login ─────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const res = await fetch("/api/admin/soshi/prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw, updates: [] }),
    })
    setLoading(false)
    if (res.ok) {
      sessionStorage.setItem("admin_pw", pw)
      onLogin()
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white" dir="rtl">
      <div className="w-full max-w-sm mx-4 rounded-2xl p-8 border" style={{ borderColor: ACCENT_LIGHT }}>
        <div className="text-center mb-8">
          <div className="text-3xl mb-3">🔐</div>
          <h1 className="text-lg font-bold text-[#121613]">پنل مدیریت منو</h1>
          <p className="text-xs text-[#6B7C6E] mt-1">سوشی گالری</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false) }}
            placeholder="رمز عبور"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none border text-center tracking-widest"
            style={{ borderColor: error ? "#ef4444" : ACCENT_LIGHT, color: "#121613" }}
            autoFocus
          />
          {error && <p className="text-center text-xs text-red-500">رمز اشتباه است</p>}
          <button
            type="submit"
            disabled={loading || !pw}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity disabled:opacity-40"
            style={{ backgroundColor: ACCENT }}
          >
            {loading ? "در حال بررسی…" : "ورود"}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Item row ──────────────────────────────────────────────────────────────────

type Override = { price?: number; available?: boolean; name?: string; ingredients?: string; deleted?: boolean; image?: string }
type CustomMenuItem = MenuItem & { created_at?: string }
type CustomCategory = MenuCategory

function displayText(name: string | null) {
  if (!name) return { name: "", ingredients: "", deleted: false, structured: false }

  try {
    const parsed = JSON.parse(name) as { name?: unknown; ingredients?: unknown; deleted?: unknown }
    return {
      name: typeof parsed.name === "string" ? parsed.name : name,
      ingredients: typeof parsed.ingredients === "string" ? parsed.ingredients : "",
      deleted: parsed.deleted === true,
      structured: true,
    }
  } catch {
    return { name, ingredients: "", deleted: false, structured: false }
  }
}

function ItemRow({
  item,
  override,
  pending,
  onChange,
  onUploadImage,
  onRemoveImage,
  onDelete,
  imageBusy,
  imageSaved,
}: {
  item: MenuItem
  override: Override
  pending: Override
  onChange: (id: string, field: "price" | "available" | "name" | "ingredients", value: number | boolean | string) => void
  onUploadImage: (id: string, file: File) => void
  onRemoveImage: (id: string) => void
  onDelete: (item: MenuItem & { currentName: string; currentIngredients: string; currentPrice: number; currentImage?: string }) => void
  imageBusy: boolean
  imageSaved: boolean
}) {
  const merged = { ...override, ...pending }
  const currentPrice = merged.price ?? item.price
  const isAvailable = merged.available ?? item.available
  const currentName = merged.name ?? item.name
  const currentIngredients = merged.ingredients ?? item.ingredients

  // Effective image: "" override = removed; url = custom; otherwise built-in default
  const effectiveImage =
    "image" in merged ? (merged.image || null) : item.image ?? null

  const [priceVal, setPriceVal] = useState(String(currentPrice))
  const [nameVal, setNameVal] = useState(currentName)
  const [ingredientsVal, setIngredientsVal] = useState(currentIngredients)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setPriceVal(String(merged.price ?? item.price)) }, [merged.price, item.price])
  useEffect(() => { setNameVal(merged.name ?? item.name) }, [merged.name, item.name])
  useEffect(() => { setIngredientsVal(merged.ingredients ?? item.ingredients) }, [merged.ingredients, item.ingredients])

  const priceDirty = "price" in pending
  const nameDirty = "name" in pending
  const ingredientsDirty = "ingredients" in pending

  function handlePriceBlur() {
    const n = parseInt(priceVal.replace(/,/g, ""), 10)
    if (!isNaN(n) && n > 0 && n !== currentPrice) onChange(item.id, "price", n)
    else setPriceVal(String(merged.price ?? item.price))
  }
  function handleNameBlur() {
    const v = nameVal.trim()
    if (v && v !== currentName) onChange(item.id, "name", v)
    else setNameVal(currentName)
  }
  function handleIngredientsBlur() {
    const v = ingredientsVal.trim()
    if (v !== currentIngredients) onChange(item.id, "ingredients", v)
    else setIngredientsVal(currentIngredients)
  }

  return (
    <div
      className="flex flex-col gap-2.5 px-3 py-3 rounded-xl border transition-all"
      style={{
        backgroundColor: !isAvailable ? "#FFF5F5" : (priceDirty || nameDirty || ingredientsDirty) ? "#F0FDF4" : "white",
        borderColor: !isAvailable ? "#FECACA" : (priceDirty || nameDirty || ingredientsDirty) ? "#86EFAC" : ACCENT_LIGHT,
        opacity: !isAvailable ? 0.85 : 1,
      }}
    >
      {/* Top: availability + name + price */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(item.id, "available", !isAvailable)}
          className="flex-shrink-0 w-10 h-6 rounded-full transition-all relative"
          style={{ backgroundColor: isAvailable ? ACCENT : "#D1D5DB" }}
          title={isAvailable ? "موجود — کلیک برای غیرفعال" : "ناموجود — کلیک برای فعال"}
        >
          <span
            className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
            style={{ right: isAvailable ? "2px" : "auto", left: isAvailable ? "auto" : "2px" }}
          />
        </button>

        <input
          value={nameVal}
          onChange={(e) => setNameVal(e.target.value)}
          onBlur={handleNameBlur}
          className={`flex-1 min-w-0 rounded-lg px-2 py-1.5 text-sm font-semibold outline-none border ${!isAvailable ? "line-through" : ""}`}
          style={{
            borderColor: nameDirty ? ACCENT : "transparent",
            backgroundColor: nameDirty ? "#F0FDF4" : "#F7FAF8",
            color: "#121613",
          }}
          placeholder="نام غذا"
        />

        <div className="relative flex-shrink-0">
          <input
            type="number"
            value={priceVal}
            onChange={(e) => setPriceVal(e.target.value)}
            onBlur={handlePriceBlur}
            disabled={!isAvailable}
            className="w-24 rounded-lg px-2 py-1.5 text-sm font-bold tabular-nums outline-none border text-right disabled:opacity-50"
            style={{
              borderColor: priceDirty ? ACCENT : ACCENT_LIGHT,
              color: priceDirty ? ACCENT : "#121613",
              backgroundColor: "white",
            }}
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-[#6B7C6E] pointer-events-none">ت</span>
        </div>
      </div>

      <textarea
        value={ingredientsVal}
        onChange={(e) => setIngredientsVal(e.target.value)}
        onBlur={handleIngredientsBlur}
        className="mr-[52px] min-h-14 rounded-lg px-2 py-1.5 text-xs outline-none border resize-y"
        style={{
          borderColor: ingredientsDirty ? ACCENT : "transparent",
          backgroundColor: ingredientsDirty ? "#F0FDF4" : "#F7FAF8",
          color: "#516254",
        }}
        placeholder="اجزا / توضیحات"
      />

      {/* Bottom: image controls */}
      <div className="flex items-center gap-3 pr-[52px]">
        <div
          className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
          style={{ background: "#EEF7F2", border: `1px solid ${ACCENT_LIGHT}` }}
        >
          {effectiveImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={effectiveImage} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] text-[#A0B0A4]">بدون عکس</span>
          )}
          {imageBusy && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-[10px] text-[#1B5C38]">
              …
            </div>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onUploadImage(item.id, f)
            e.target.value = ""
          }}
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={imageBusy}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold disabled:opacity-40 transition-all ${imageSaved ? "bg-emerald-100 text-emerald-700" : ""}`}
          style={!imageSaved ? { background: ACCENT_LIGHT, color: ACCENT } : undefined}
        >
          {imageSaved ? "✓ ذخیره شد" : (effectiveImage ? "تغییر عکس" : "افزودن عکس")}
        </button>
        {effectiveImage && (
          <button
            onClick={() => onRemoveImage(item.id)}
            disabled={imageBusy}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold disabled:opacity-40 transition-all ${imageSaved ? "bg-red-100 text-red-900" : ""}`}
            style={!imageSaved ? { background: "#FEF2F2", color: "#DC2626" } : undefined}
          >
            {imageSaved ? "✓ حذف شد" : "حذف عکس"}
          </button>
        )}
        <button
          onClick={() => onDelete({
            ...item,
            currentName,
            currentIngredients,
            currentPrice,
            ...(effectiveImage ? { currentImage: effectiveImage } : {}),
          })}
          disabled={imageBusy}
          className="mr-auto px-3 py-1.5 rounded-lg text-[11px] font-semibold disabled:opacity-40 transition-all"
          style={{ background: "#7F1D1D", color: "white" }}
        >
          حذف برای همیشه
        </button>
      </div>
    </div>
  )
}

// ─── Main panel ────────────────────────────────────────────────────────────────

function AdminPanel({ password }: { password: string }) {
  const [overrides, setOverrides] = useState<Record<string, Override>>({})
  const [pending, setPending] = useState<Record<string, Override>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [query, setQuery] = useState("")
  const [showAddItem, setShowAddItem] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newItem, setNewItem] = useState({ category: "sushi", name: "", ingredients: "", price: "" })
  const [newCategory, setNewCategory] = useState("")
  const [customItems, setCustomItems] = useState<MenuItem[]>([])
  const [customCategories, setCustomCategories] = useState<CustomCategory[]>([])
  const [imageBusyId, setImageBusyId] = useState<string | null>(null)
  const [imageSavedId, setImageSavedId] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/soshi/items").then((r) => r.json()).catch(() => []),
      fetch("/api/admin/soshi/categories").then((r) => r.json()).catch(() => []),
      fetch("/api/admin/soshi/prices").then((r) => r.json()).catch(() => []),
    ])
      .then(([itemRows, categoryRows, overrideRows]: [
        CustomMenuItem[],
        CustomCategory[],
        {
        item_id: string; price: number | null; available: boolean | null
        name: string | null; image: string | null
      }[]
      ]) => {
        if (Array.isArray(itemRows)) {
          setCustomItems(itemRows.map((item) => ({
            id: item.id,
            category: item.category,
            name: item.name,
            ingredients: item.ingredients ?? "",
            price: item.price,
            available: item.available ?? true,
            ...(item.image ? { image: item.image } : {}),
          })))
        }
        if (Array.isArray(categoryRows)) {
          setCustomCategories(categoryRows.map((cat) => ({
            id: cat.id,
            name: cat.name,
            ...(cat.image ? { image: cat.image } : {}),
          })))
        }
        if (!Array.isArray(overrideRows)) return
        const map: Record<string, Override> = {}
        overrideRows.forEach(({ item_id, price, available, name, image }) => {
          const decoded = displayText(name)
          map[item_id] = {
            ...(price !== null ? { price } : {}),
            ...(available !== null ? { available } : {}),
            ...(decoded.name ? { name: decoded.name } : {}),
            ...(decoded.structured ? { ingredients: decoded.ingredients } : {}),
            ...(decoded.deleted ? { deleted: true } : {}),
            ...(image !== null ? { image } : {}), // "" = removed photo
          }
        })
        setOverrides(map)
      })
      .catch(() => {})
  }, [])

  const allMenuItems = useMemo(() => [...menuItems, ...customItems], [customItems])
  const allCategories = useMemo(() => [...menuCategories, ...customCategories], [customCategories])

  function handleChange(id: string, field: "price" | "available" | "name" | "ingredients", value: number | boolean | string) {
    setPending((p) => ({ ...p, [id]: { ...p[id], [field]: value } }))
    setSaved(false)
  }

  async function persistImage(id: string, image: string) {
    const res = await fetch("/api/admin/soshi/prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, updates: [{ item_id: id, image }] }),
    })
    if (res.ok) {
      setOverrides((o) => ({ ...o, [id]: { ...o[id], image } }))
      return true
    }
    return false
  }

  async function handleUploadImage(id: string, file: File) {
    setImageBusyId(id)
    try {
      const blob = await resizeToWebp(file, 900)
      const fd = new FormData()
      fd.append("password", password)
      fd.append("item_id", id)
      fd.append("file", blob, "photo.webp")
      const up = await fetch("/api/admin/soshi/upload", { method: "POST", body: fd })
      if (!up.ok) throw new Error("upload")
      const { url } = await up.json()
      const ok = await persistImage(id, url)
      if (!ok) throw new Error("save")
      setImageSavedId(id)
      setTimeout(() => setImageSavedId(null), 2500)
    } catch {
      alert("خطا در آپلود عکس. دوباره تلاش کنید.")
    } finally {
      setImageBusyId(null)
    }
  }

  async function handleRemoveImage(id: string) {
    setImageBusyId(id)
    try {
      const ok = await persistImage(id, "")
      if (!ok) throw new Error("save")
      setImageSavedId(id)
      setTimeout(() => setImageSavedId(null), 2500)
    } catch {
      alert("خطا در حذف عکس.")
    } finally {
      setImageBusyId(null)
    }
  }

  async function handleDeleteItem(item: MenuItem & { currentName: string; currentIngredients: string; currentPrice: number; currentImage?: string }) {
    if (!confirm(`آیتم «${item.currentName}» برای همیشه حذف شود؟`)) return

    const res = await fetch("/api/admin/soshi/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        id: item.id,
        name: item.currentName,
        ingredients: item.currentIngredients,
        price: item.currentPrice,
        image: item.currentImage ?? null,
      }),
    })

    if (res.ok) {
      setCustomItems((items) => items.filter((i) => i.id !== item.id))
      setPending((items) => {
        const next = { ...items }
        delete next[item.id]
        return next
      })
      setOverrides((items) => ({ ...items, [item.id]: { ...items[item.id], deleted: true } }))
    } else {
      const data = await res.json().catch(() => null)
      alert(data?.error ? `خطا در حذف آیتم:\n${data.error}` : "خطا در حذف آیتم")
    }
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault()
    const name = newCategory.trim()
    if (!name) return

    const res = await fetch("/api/admin/soshi/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, name }),
    })

    if (res.ok) {
      const category = await res.json().catch(() => null)
      if (category?.id && category?.name) {
        setCustomCategories((categories) => [...categories, { id: category.id, name: category.name }])
        setNewItem((item) => ({ ...item, category: category.id }))
      }
      setNewCategory("")
      setShowAddCategory(false)
    } else {
      const data = await res.json().catch(() => null)
      alert(data?.error ? `خطا در افزودن دسته:\n${data.error}` : "خطا در افزودن دسته")
    }
  }

  async function handleSave() {
    setSaving(true)
    const itemMap = new Map(allMenuItems.map((item) => [item.id, item]))
    const updates = Object.entries(pending).map(([item_id, o]) => ({
      item_id,
      ...o,
      ...("ingredients" in o && !("name" in o)
        ? { name: overrides[item_id]?.name ?? itemMap.get(item_id)?.name ?? "" }
        : {}),
      ...("name" in o && !("ingredients" in o)
        ? { ingredients: overrides[item_id]?.ingredients ?? itemMap.get(item_id)?.ingredients ?? "" }
        : {}),
    }))
    const res = await fetch("/api/admin/soshi/prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, updates }),
    })
    setSaving(false)
    if (res.ok) {
      setOverrides((o) => {
        const next = { ...o }
        Object.entries(pending).forEach(([id, p]) => { next[id] = { ...next[id], ...p } })
        return next
      })
      setPending({})
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault()
    if (!newItem.name || !newItem.price) {
      alert("نام و قیمت الزامی است")
      return
    }
    const res = await fetch("/api/admin/soshi/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        category: newItem.category,
        name: newItem.name,
        ingredients: newItem.ingredients,
        price: parseInt(newItem.price, 10) * 1000,
      }),
    })
    if (res.ok) {
      const item = await res.json().catch(() => null)
      if (item && item.id) {
        setCustomItems((items) => [{
          id: item.id,
          category: item.category,
          name: item.name,
          ingredients: item.ingredients ?? "",
          price: item.price,
          available: item.available ?? true,
          ...(item.image ? { image: item.image } : {}),
        }, ...items])
      }
      alert("آیتم شامل شد")
      setNewItem({ category: "sushi", name: "", ingredients: "", price: "" })
      setShowAddItem(false)
    } else {
      const data = await res.json().catch(() => null)
      alert(data?.error ? `خطا در شامل کردن:\n${data.error}` : "خطا در شامل کردن")
    }
  }

  const activeItems = useMemo(() => {
    const visibleItems = allMenuItems.filter((i) => !overrides[i.id]?.deleted)
    const byCat = activeCategory === "all"
      ? visibleItems
      : visibleItems.filter((i) => i.category === activeCategory)
    if (!query.trim()) return byCat
    const q = query.trim().toLowerCase()
    return byCat.filter((i) => {
      const name = (pending[i.id]?.name ?? overrides[i.id]?.name ?? i.name).toLowerCase()
      return name.includes(q)
    })
  }, [activeCategory, allMenuItems, query, overrides, pending])

  const dirtyCount = Object.keys(pending).length
  const unavailableCount = allMenuItems.filter((i) => {
    if (overrides[i.id]?.deleted) return false
    const o = { ...overrides[i.id], ...pending[i.id] }
    return o.available === false
  }).length

  const activeCategories = useMemo(
    () => allCategories.filter((c) => allMenuItems.some((i) => i.category === c.id && !overrides[i.id]?.deleted)),
    [allCategories, allMenuItems, overrides]
  )

  return (
    <div className="min-h-screen pb-28 bg-[#F7FAF8]" dir="rtl">
      <header
        className="sticky top-0 z-20 flex items-center justify-between h-14 px-4 border-b bg-white"
        style={{ borderColor: ACCENT_LIGHT }}
      >
        <div>
          <h1 className="text-sm font-bold text-[#121613]">مدیریت منو سوشی</h1>
          {unavailableCount > 0 && (
            <p className="text-[10px] text-red-500">{unavailableCount} آیتم ناموجود</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddCategory(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ backgroundColor: ACCENT_LIGHT, color: ACCENT }}
          >
            + دسته جدید
          </button>
          <button
            onClick={() => setShowAddItem(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white"
            style={{ backgroundColor: ACCENT }}
          >
            ➕ آیتم جدید
          </button>
          {dirtyCount > 0 && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-50 text-green-700">
              {dirtyCount} تغییر
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={dirtyCount === 0 || saving}
            className="px-4 py-1.5 rounded-xl text-xs font-bold text-white transition-all disabled:opacity-40"
            style={{ backgroundColor: saved ? "#22c55e" : ACCENT }}
          >
            {saving ? "ذخیره…" : saved ? "✓ ذخیره شد" : "ذخیره"}
          </button>
        </div>
      </header>

      <div className="sticky top-14 z-10 bg-white border-b px-3 pt-2" style={{ borderColor: ACCENT_LIGHT }}>
        <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => { setActiveCategory("all"); setQuery("") }}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all"
            style={{
              backgroundColor: activeCategory === "all" ? ACCENT : ACCENT_LIGHT,
              color: activeCategory === "all" ? "white" : "#1B5C38",
            }}
          >
            همه ({allMenuItems.filter((i) => !overrides[i.id]?.deleted).length})
          </button>
          {activeCategories.map((cat) => {
            const count = allMenuItems.filter((i) => i.category === cat.id && !overrides[i.id]?.deleted).length
            const unavail = allMenuItems.filter((i) => {
              if (overrides[i.id]?.deleted) return false
              if (i.category !== cat.id) return false
              const o = { ...overrides[i.id], ...pending[i.id] }
              return o.available === false
            }).length
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setQuery("") }}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all relative"
                style={{
                  backgroundColor: activeCategory === cat.id ? ACCENT : ACCENT_LIGHT,
                  color: activeCategory === cat.id ? "white" : "#1B5C38",
                }}
              >
                {cat.name} ({count})
                {unavail > 0 && (
                  <span className="absolute -top-1 -left-1 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center">
                    {unavail}
                  </span>
                )}
              </button>
            )
          })}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی آیتم…"
          className="w-full rounded-xl px-4 py-2 text-xs outline-none border mb-2"
          style={{ borderColor: ACCENT_LIGHT, color: "#121613" }}
        />
      </div>

      <main className="px-3 pt-3">
        <p className="text-[11px] text-[#6B7C6E] mb-2">{activeItems.length} آیتم</p>
        <div className="flex flex-col gap-2">
          {activeItems.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              override={overrides[item.id] ?? {}}
              pending={pending[item.id] ?? {}}
              onChange={handleChange}
              onUploadImage={handleUploadImage}
              onRemoveImage={handleRemoveImage}
              onDelete={handleDeleteItem}
              imageBusy={imageBusyId === item.id}
              imageSaved={imageSavedId === item.id}
            />
          ))}
        </div>
      </main>

      {dirtyCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t" style={{ borderColor: ACCENT_LIGHT }}>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
            style={{ backgroundColor: ACCENT }}
          >
            {saving ? "در حال ذخیره…" : `ذخیره ${dirtyCount} تغییر`}
          </button>
        </div>
      )}

      {showAddCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" dir="rtl">
            <h2 className="text-lg font-bold mb-4 text-[#121613]">دسته جدید</h2>
            <form onSubmit={handleAddCategory} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="نام دسته"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-3 py-2 rounded-lg border outline-none text-sm"
                style={{ borderColor: ACCENT_LIGHT, color: "#121613" }}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setShowAddCategory(false); setNewCategory("") }}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold"
                  style={{ background: ACCENT_LIGHT, color: ACCENT }}
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  افزودن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" dir="rtl">
            <h2 className="text-lg font-bold mb-4 text-[#121613]">آیتم جدید</h2>
            <form onSubmit={handleAddItem} className="flex flex-col gap-3">
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                className="px-3 py-2 rounded-lg border outline-none text-sm"
                style={{ borderColor: ACCENT_LIGHT, color: "#121613" }}
              >
                {allCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="نام غذا"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="px-3 py-2 rounded-lg border outline-none text-sm"
                style={{ borderColor: ACCENT_LIGHT, color: "#121613" }}
              />
              <textarea
                placeholder="اجزاء (اختیاری)"
                value={newItem.ingredients}
                onChange={(e) => setNewItem({...newItem, ingredients: e.target.value})}
                className="px-3 py-2 rounded-lg border outline-none text-sm h-16 resize-none"
                style={{ borderColor: ACCENT_LIGHT, color: "#121613" }}
              />
              <input
                type="number"
                placeholder="قیمت (هزار تومان)"
                value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                className="px-3 py-2 rounded-lg border outline-none text-sm"
                style={{ borderColor: ACCENT_LIGHT, color: "#121613" }}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddItem(false)}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold"
                  style={{ background: ACCENT_LIGHT, color: ACCENT }}
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  شامل کردن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AdminSoshiPage() {
  const [password, setPassword] = useState<string | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_pw")
    if (stored) setPassword(stored)
  }, [])

  if (!password) {
    return <LoginScreen onLogin={() => setPassword(sessionStorage.getItem("admin_pw")!)} />
  }

  return <AdminPanel password={password} />
}
