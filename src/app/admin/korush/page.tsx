"use client"

import { useState, useEffect, useMemo } from "react"
import { menuBrands, menuItems } from "../../../../korush/src/data/menu-data"
import { formatToman } from "../../../../korush/src/lib/format-price"
import type { MenuItem, MenuBrand } from "../../../../korush/src/types/menu"

const BRANDS = menuBrands as unknown as MenuBrand[]
const ALL_ITEMS = menuItems as unknown as MenuItem[]

// ─── Login screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const res = await fetch("/api/admin/korush/prices", {
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
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#0D1117", direction: "rtl" }}
    >
      <div
        className="w-full max-w-sm mx-4 rounded-2xl p-8 border"
        style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="text-center mb-8">
          <div className="text-3xl mb-3">🔐</div>
          <h1 className="text-lg font-bold text-[#F4E9D8]">پنل مدیریت منو</h1>
          <p className="text-xs text-[#8A7B68] mt-1">کوروش مال</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false) }}
            placeholder="رمز عبور"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none border text-center tracking-widest"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderColor: error ? "#ef4444" : "rgba(255,255,255,0.1)",
              color: "#F4E9D8",
            }}
            autoFocus
          />
          {error && (
            <p className="text-center text-xs text-red-400">رمز اشتباه است</p>
          )}
          <button
            type="submit"
            disabled={loading || !pw}
            className="w-full py-3 rounded-xl text-sm font-bold transition-opacity disabled:opacity-40"
            style={{ backgroundColor: "#2F7A78", color: "#fff" }}
          >
            {loading ? "در حال بررسی…" : "ورود"}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Price row ─────────────────────────────────────────────────────────────────

function PriceRow({
  item,
  accent,
  overridePrice,
  onChange,
}: {
  item: MenuItem
  accent: string
  overridePrice: number | null
  onChange: (id: string, price: number) => void
}) {
  const current = overridePrice ?? item.price
  const [val, setVal] = useState(String(current))
  const dirty = Number(val) !== current && val !== ""

  useEffect(() => {
    setVal(String(overridePrice ?? item.price))
  }, [overridePrice, item.price])

  function handleBlur() {
    const n = parseInt(val.replace(/,/g, ""), 10)
    if (!isNaN(n) && n > 0) onChange(item.id, n)
    else setVal(String(overridePrice ?? item.price))
  }

  return (
    <div
      className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border transition-all"
      style={{
        backgroundColor: dirty ? `${accent}10` : "rgba(255,255,255,0.03)",
        borderColor: dirty ? `${accent}44` : "rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#F4E9D8] truncate">{item.name}</p>
        {item.variant && (
          <p className="text-[11px] text-[#8A7B68] truncate">{item.variant}</p>
        )}
        <p className="text-[10px] mt-0.5" style={{ color: `${accent}99` }}>{item.category}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {dirty && (
          <span className="text-[10px] line-through text-[#8A7B68]">
            {formatToman(overridePrice ?? item.price)}
          </span>
        )}
        <div className="relative">
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onBlur={handleBlur}
            className="w-28 text-left rounded-lg px-2 py-1.5 text-sm font-bold tabular-nums outline-none border text-right"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderColor: dirty ? accent : "rgba(255,255,255,0.1)",
              color: dirty ? accent : "#F4E9D8",
            }}
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-[#8A7B68] pointer-events-none">
            ت
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Main admin panel ──────────────────────────────────────────────────────────

function AdminPanel({ password }: { password: string }) {
  const [overrides, setOverrides] = useState<Record<string, number>>({})
  const [pending, setPending] = useState<Record<string, number>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeBrand, setActiveBrand] = useState(BRANDS[0].id)
  const [query, setQuery] = useState("")

  // Load existing overrides from DB
  useEffect(() => {
    fetch("/api/admin/korush/prices")
      .then((r) => r.json())
      .then((rows: { item_id: string; price: number }[]) => {
        const map: Record<string, number> = {}
        rows.forEach(({ item_id, price }) => { map[item_id] = price })
        setOverrides(map)
      })
      .catch(() => {})
  }, [])

  function handleChange(id: string, price: number) {
    setPending((p) => ({ ...p, [id]: price }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    const updates = Object.entries(pending).map(([item_id, price]) => ({ item_id, price }))
    const res = await fetch("/api/admin/korush/prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, updates }),
    })
    setSaving(false)
    if (res.ok) {
      setOverrides((o) => ({ ...o, ...pending }))
      setPending({})
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const brandItems = useMemo(
    () => ALL_ITEMS.filter((i) => i.brand === activeBrand),
    [activeBrand]
  )

  const filtered = useMemo(() => {
    if (!query.trim()) return brandItems
    const q = query.trim().toLowerCase()
    return brandItems.filter(
      (i) => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    )
  }, [brandItems, query])

  const brand = BRANDS.find((b) => b.id === activeBrand)!
  const dirtyCount = Object.keys(pending).length

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "#0D1117", direction: "rtl" }}>

      {/* Header */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between h-14 px-4 border-b backdrop-blur-sm"
        style={{ backgroundColor: "rgba(13,17,23,0.97)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <h1 className="text-sm font-bold text-[#F4E9D8]">مدیریت قیمت‌ها</h1>
        <div className="flex items-center gap-2">
          {dirtyCount > 0 && (
            <span
              className="text-[11px] px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${brand.accent}22`, color: brand.accent }}
            >
              {dirtyCount} تغییر
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={dirtyCount === 0 || saving}
            className="px-4 py-1.5 rounded-xl text-xs font-bold transition-all disabled:opacity-40"
            style={{
              backgroundColor: saved ? "#22c55e" : brand.accent,
              color: "#fff",
            }}
          >
            {saving ? "ذخیره…" : saved ? "✓ ذخیره شد" : "ذخیره"}
          </button>
        </div>
      </header>

      {/* Brand tabs */}
      <div
        className="sticky top-14 z-10 px-3 pt-2 pb-2 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(13,17,23,0.97)" }}
      >
        <div
          className="flex rounded-xl p-1 gap-1 mb-2"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          {BRANDS.map((b) => (
            <button
              key={b.id}
              onClick={() => { setActiveBrand(b.id); setQuery("") }}
              className="flex-1 py-2 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap"
              style={{
                backgroundColor: b.id === activeBrand ? b.accent : "transparent",
                color: b.id === activeBrand ? "#fff" : "rgba(244,233,216,0.45)",
              }}
            >
              {b.shortTitle}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی آیتم…"
          className="w-full rounded-xl px-4 py-2 text-xs outline-none border"
          style={{
            backgroundColor: "rgba(255,255,255,0.07)",
            borderColor: "rgba(255,255,255,0.08)",
            color: "#F4E9D8",
          }}
        />
      </div>

      {/* Items list */}
      <main className="px-3 pt-2">
        <p className="text-[11px] text-[#8A7B68] mb-2">{filtered.length} آیتم</p>
        <div className="flex flex-col gap-1.5">
          {filtered.map((item) => (
            <PriceRow
              key={item.id}
              item={item}
              accent={brand.accent}
              overridePrice={pending[item.id] ?? overrides[item.id] ?? null}
              onChange={handleChange}
            />
          ))}
        </div>
      </main>

      {/* Sticky save bar */}
      {dirtyCount > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 p-4 border-t backdrop-blur-md"
          style={{ backgroundColor: "rgba(13,17,23,0.97)", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
            style={{ backgroundColor: brand.accent, color: "#fff" }}
          >
            {saving ? "در حال ذخیره…" : `ذخیره ${dirtyCount} تغییر`}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AdminKorushPage() {
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
