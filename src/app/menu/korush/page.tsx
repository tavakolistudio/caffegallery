"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search, X } from "lucide-react"
import { menuBrands, menuItems } from "../../../../korush/src/data/menu-data"
import { formatToman } from "../../../../korush/src/lib/format-price"
import type { BrandId, MenuItem, MenuBrand } from "../../../../korush/src/types/menu"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizePersian(text: string): string {
  return text.replace(/‌/g, " ").replace(/\s+/g, " ").trim().toLowerCase()
}

function filterItems(items: readonly MenuItem[], query: string, category: string): MenuItem[] {
  let result = items as MenuItem[]
  if (category !== "همه") result = result.filter((i) => i.category === category)
  const q = query.trim()
  if (q) {
    const nq = normalizePersian(q)
    result = result.filter((i) =>
      normalizePersian([i.name, i.category, i.description ?? "", i.variant ?? ""].join(" ")).includes(nq)
    )
  }
  return result
}

function toPersianNum(n: number): string {
  return n.toLocaleString("fa-IR")
}

// ─── Item card ────────────────────────────────────────────────────────────────

function ItemCard({ item, brand, priceOverride }: { item: MenuItem; brand: MenuBrand; priceOverride?: number }) {
  const accent = brand.accent
  const [imgError, setImgError] = useState(false)
  const imgSrc = `/images/menu/korush/${item.id}.webp`

  return (
    <article
      className="flex flex-col rounded-2xl overflow-hidden border transition-all duration-200 active:scale-[0.98]"
      style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: `${accent}22` }}
    >
      {!imgError && (
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={imgSrc}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            style={{ filter: "brightness(0.85)" }}
            onError={() => setImgError(true)}
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${brand.background ?? "#0D1117"}cc 0%, transparent 60%)` }}
          />
          <span
            className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: `${accent}cc`, color: "#fff" }}
          >
            {item.category}
          </span>
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col flex-1 px-3 py-2.5 gap-1.5">
        <h3 className="text-[13px] font-bold leading-snug text-[#F4E9D8]">{item.name}</h3>
        {item.variant && (
          <p className="text-[11px] text-[#B8A58F] leading-tight">{item.variant}</p>
        )}
        {item.description && (
          <p className="text-[10px] text-[#8A7B68] leading-relaxed line-clamp-2">{item.description}</p>
        )}
        <div className="flex-1" />
        <div className="flex items-center justify-between pt-1.5 border-t" style={{ borderColor: `${accent}18` }}>
          {item.amount ? (
            <span className="text-[10px] text-[#8A7B68]">{item.amount}</span>
          ) : <span />}
          <span className="text-[13px] font-bold tabular-nums" style={{ color: accent }}>
            {formatToman(priceOverride ?? item.price)}
          </span>
        </div>
      </div>
    </article>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function KorushMenuPage() {
  const brands = menuBrands as unknown as MenuBrand[]
  const allItems = menuItems as unknown as readonly MenuItem[]

  const [activeBrandId, setActiveBrandId] = useState<BrandId>(brands[0].id)
  const [activeCategory, setActiveCategory] = useState("همه")
  const [query, setQuery] = useState("")
  const [priceOverrides, setPriceOverrides] = useState<Record<string, number>>({})

  useEffect(() => {
    fetch("/api/admin/korush/prices")
      .then((r) => r.json())
      .then((rows: { item_id: string; price: number }[]) => {
        const map: Record<string, number> = {}
        rows.forEach(({ item_id, price }) => { map[item_id] = price })
        setPriceOverrides(map)
      })
      .catch(() => {})
  }, [])

  const activeBrand = brands.find((b) => b.id === activeBrandId)!

  const brandItems = useMemo(
    () => allItems.filter((i) => i.brand === activeBrandId),
    [activeBrandId, allItems]
  )

  const filtered = useMemo(
    () => filterItems(brandItems, query, activeCategory),
    [brandItems, query, activeCategory]
  )

  function handleBrandChange(id: BrandId) {
    setActiveBrandId(id)
    setActiveCategory("همه")
    setQuery("")
  }

  const categories = ["همه", ...activeBrand.categories]
  const isFiltered = query.trim() !== "" || activeCategory !== "همه"

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0D1117", color: "#F4E9D8" }}>

      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between h-12 px-4 border-b backdrop-blur-sm"
        style={{ backgroundColor: "rgba(13,17,23,0.95)", borderColor: "rgba(244,233,216,0.08)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-1 text-xs font-semibold transition-opacity active:opacity-60"
          style={{ color: "#B8A58F" }}
          aria-label="بازگشت"
        >
          <ArrowRight size={14} />
          <span className="hidden sm:inline">کافه گالری</span>
        </Link>
        <h1 className="text-sm font-bold text-[#F4E9D8]">منو کوروش مال</h1>
        <div className="w-14" aria-hidden />
      </header>

      {/* ── BRAND TABS ── */}
      <div
        className="sticky top-12 z-10 px-3 pt-2.5 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(13,17,23,0.97)" }}
      >
        <div
          className="flex rounded-xl p-1 gap-1"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          role="tablist"
        >
          {brands.map((brand) => {
            const active = brand.id === activeBrandId
            return (
              <button
                key={brand.id}
                role="tab"
                aria-selected={active}
                onClick={() => handleBrandChange(brand.id)}
                className="flex-1 py-2 rounded-lg text-[11px] font-bold transition-all duration-150 whitespace-nowrap"
                style={{
                  backgroundColor: active ? brand.accent : "transparent",
                  color: active ? "#fff" : "rgba(244,233,216,0.45)",
                }}
              >
                {brand.shortTitle}
              </button>
            )
          })}
        </div>

        {/* Search */}
        <div className="relative mt-2">
          <Search
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: activeBrand.accent, opacity: 0.7 }}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو…"
            className="w-full rounded-xl pr-8 pl-8 py-2 text-xs outline-none border border-transparent transition-all"
            style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "#F4E9D8" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = `${activeBrand.accent}55` }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "transparent" }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              aria-label="پاک کردن"
            >
              <X size={13} style={{ color: "rgba(244,233,216,0.4)" }} />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div
          className="flex gap-1.5 overflow-x-auto py-2.5 no-scrollbar"
          role="tablist"
        >
          {categories.map((cat) => {
            const active = cat === activeCategory
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-150 whitespace-nowrap"
                style={{
                  backgroundColor: active ? activeBrand.accent : "rgba(255,255,255,0.07)",
                  color: active ? "#fff" : "rgba(244,233,216,0.5)",
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <main className="px-3 pb-16">
        <p className="text-[11px] text-[#8A7B68] mb-3">
          {isFiltered
            ? `${toPersianNum(filtered.length)} از ${toPersianNum(brandItems.length)} آیتم`
            : `${toPersianNum(filtered.length)} آیتم`}
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <Search size={32} style={{ color: activeBrand.accent, opacity: 0.3 }} />
            <p className="text-sm text-[#8A7B68]">
              {query ? `نتیجه‌ای برای «${query}» پیدا نشد` : "آیتمی در این دسته موجود نیست"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} brand={activeBrand} priceOverride={priceOverrides[item.id]} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-2 py-8 px-4">
        <p className="text-[10px]" style={{ color: "rgba(184,165,143,0.3)" }}>
          تمام قیمت‌ها به تومان است.
        </p>
        <a
          href="https://tavakolistudio.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 group mt-1"
        >
          <span className="text-[10px] transition-opacity group-hover:opacity-100" style={{ color: "rgba(184,165,143,0.35)" }}>
            طراحی شده توسط
          </span>
          <span
            className="text-[11px] font-bold tracking-widest transition-all group-hover:opacity-100"
            style={{ color: "rgba(184,165,143,0.5)", fontFamily: "monospace", letterSpacing: "0.12em" }}
          >
            TAVAKOLISTUDIO
          </span>
        </a>
      </footer>
    </div>
  )
}
