"use client"

import { useState, useEffect, useMemo } from "react"
import { menuItems, menuCategories } from "@/data/menu"
import { formatPrice } from "@/lib/formatPrice"

const ACCENT = "#1B5C38"
const ACCENT_LIGHT = "#E8EFE9"

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
      <div
        className="w-full max-w-sm mx-4 rounded-2xl p-8 border"
        style={{ borderColor: ACCENT_LIGHT }}
      >
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
            style={{
              borderColor: error ? "#ef4444" : ACCENT_LIGHT,
              color: "#121613",
            }}
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

function ItemRow({
  item,
  overridePrice,
  overrideAvailable,
  onChange,
}: {
  item: { id: string; name: string; ingredients: string; price: number; available: boolean }
  overridePrice: number | undefined
  overrideAvailable: boolean | undefined
  onChange: (id: string, field: "price" | "available", value: number | boolean) => void
}) {
  const currentPrice = overridePrice ?? item.price
  const isAvailable = overrideAvailable ?? item.available
  const [val, setVal] = useState(String(currentPrice))
  const priceDirty = Number(val) !== currentPrice && val !== ""

  useEffect(() => {
    setVal(String(overridePrice ?? item.price))
  }, [overridePrice, item.price])

  function handleBlur() {
    const n = parseInt(val.replace(/,/g, ""), 10)
    if (!isNaN(n) && n > 0) onChange(item.id, "price", n)
    else setVal(String(overridePrice ?? item.price))
  }

  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all"
      style={{
        backgroundColor: !isAvailable ? "#FFF5F5" : priceDirty ? "#F0FDF4" : "white",
        borderColor: !isAvailable ? "#FECACA" : priceDirty ? "#86EFAC" : ACCENT_LIGHT,
        opacity: !isAvailable ? 0.7 : 1,
      }}
    >
      {/* Availability toggle */}
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

      {/* Name & ingredients */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${!isAvailable ? "line-through text-[#A0B0A4]" : "text-[#121613]"}`}>
          {item.name}
        </p>
        {item.ingredients && (
          <p className="text-[10px] text-[#6B7C6E] truncate mt-0.5">{item.ingredients}</p>
        )}
      </div>

      {/* Price input */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {priceDirty && (
          <span className="text-[10px] line-through text-[#A0B0A4]">
            {formatPrice(currentPrice)}
          </span>
        )}
        <div className="relative">
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onBlur={handleBlur}
            disabled={!isAvailable}
            className="w-28 rounded-lg px-2 py-1.5 text-sm font-bold tabular-nums outline-none border text-right disabled:opacity-50"
            style={{
              borderColor: priceDirty ? ACCENT : ACCENT_LIGHT,
              color: priceDirty ? ACCENT : "#121613",
              backgroundColor: "white",
            }}
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-[#6B7C6E] pointer-events-none">ت</span>
        </div>
      </div>
    </div>
  )
}

// ─── Main panel ────────────────────────────────────────────────────────────────

type Override = { price?: number; available?: boolean }

function AdminPanel({ password }: { password: string }) {
  const [overrides, setOverrides] = useState<Record<string, Override>>({})
  const [pending, setPending] = useState<Record<string, Override>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [query, setQuery] = useState("")

  // Load existing overrides
  useEffect(() => {
    fetch("/api/admin/soshi/prices")
      .then((r) => r.json())
      .then((rows: { item_id: string; price: number | null; available: boolean | null }[]) => {
        const map: Record<string, Override> = {}
        rows.forEach(({ item_id, price, available }) => {
          map[item_id] = {
            ...(price !== null ? { price } : {}),
            ...(available !== null ? { available } : {}),
          }
        })
        setOverrides(map)
      })
      .catch(() => {})
  }, [])

  function handleChange(id: string, field: "price" | "available", value: number | boolean) {
    setPending((p) => ({ ...p, [id]: { ...p[id], [field]: value } }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    const updates = Object.entries(pending).map(([item_id, o]) => ({ item_id, ...o }))
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

  const activeItems = useMemo(() => {
    const byCat = activeCategory === "all"
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory)
    if (!query.trim()) return byCat
    const q = query.trim().toLowerCase()
    return byCat.filter((i) => i.name.toLowerCase().includes(q))
  }, [activeCategory, query])

  const dirtyCount = Object.keys(pending).length
  const unavailableCount = menuItems.filter((i) => {
    const o = { ...overrides[i.id], ...pending[i.id] }
    return o.available === false
  }).length

  // Only show categories that have items
  const activeCategories = useMemo(
    () => menuCategories.filter((c) => menuItems.some((i) => i.category === c.id)),
    []
  )

  return (
    <div className="min-h-screen pb-28 bg-[#F7FAF8]" dir="rtl">

      {/* Header */}
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

      {/* Category tabs + search */}
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
            همه ({menuItems.length})
          </button>
          {activeCategories.map((cat) => {
            const count = menuItems.filter((i) => i.category === cat.id).length
            const unavail = menuItems.filter((i) => {
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

      {/* Items */}
      <main className="px-3 pt-3">
        <p className="text-[11px] text-[#6B7C6E] mb-2">{activeItems.length} آیتم</p>
        <div className="flex flex-col gap-1.5">
          {activeItems.map((item) => {
            const merged = { ...overrides[item.id], ...pending[item.id] }
            return (
              <ItemRow
                key={item.id}
                item={item}
                overridePrice={merged.price}
                overrideAvailable={merged.available}
                onChange={handleChange}
              />
            )
          })}
        </div>
      </main>

      {/* Sticky save bar */}
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
