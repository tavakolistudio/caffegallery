"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowRight, Search, X } from "lucide-react"
import { menuBrands, menuItems } from "../../../../korush/src/data/menu-data"
import { formatToman } from "../../../../korush/src/lib/format-price"
import type { BrandId, MenuItem, MenuBrand } from "../../../../korush/src/types/menu"

// ─── Inline helpers (avoid importing korush files that use @/ paths) ──────────

function normalizePersian(text: string): string {
  return text.replace(/‌/g, " ").replace(/\s+/g, " ").trim().toLowerCase()
}

function filterItems(
  items: readonly MenuItem[],
  query: string,
  category: string,
): MenuItem[] {
  let result = items as MenuItem[]
  if (category !== "همه") result = result.filter((i) => i.category === category)
  const q = query.trim()
  if (q) {
    const nq = normalizePersian(q)
    result = result.filter((i) =>
      normalizePersian(
        [i.name, i.category, i.description ?? "", i.variant ?? ""].join(" "),
      ).includes(nq),
    )
  }
  return result
}

function toPersianNum(n: number): string {
  return n.toLocaleString("fa-IR")
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ItemCard({ item, brand }: { item: MenuItem; brand: MenuBrand }) {
  const accent = brand.accent
  return (
    <article
      className="flex flex-col rounded-2xl border overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
      style={{
        backgroundColor: "rgba(255,255,255,0.04)",
        borderColor: `${accent}20`,
      }}
    >
      <div className="h-[3px]" style={{ backgroundColor: accent }} />
      <div className="flex flex-col flex-1 p-4 gap-2">
        <span
          className="self-start text-[11px] px-2.5 py-0.5 rounded-full font-medium"
          style={{ backgroundColor: `${accent}18`, color: accent }}
        >
          {item.category}
        </span>
        <h3 className="text-sm font-semibold leading-snug text-[#F4E9D8]">
          {item.name}
        </h3>
        {item.variant && (
          <p className="text-xs text-[#B8A58F]">{item.variant}</p>
        )}
        {item.description && (
          <p className="text-[11px] text-[#8A7B68] leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex-1" />
        <div
          className="flex items-center justify-between pt-2 border-t"
          style={{ borderColor: `${accent}18` }}
        >
          {item.amount ? (
            <span className="text-[11px] text-[#8A7B68]">{item.amount}</span>
          ) : (
            <span />
          )}
          <span className="text-sm font-bold" style={{ color: accent }}>
            {formatToman(item.price)}
          </span>
        </div>
      </div>
    </article>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function KorushMenuPage() {
  const brands = menuBrands as unknown as MenuBrand[]
  const allItems = menuItems as unknown as readonly MenuItem[]

  const [activeBrandId, setActiveBrandId] = useState<BrandId>(brands[0].id)
  const [activeCategory, setActiveCategory] = useState("همه")
  const [query, setQuery] = useState("")

  const activeBrand = brands.find((b) => b.id === activeBrandId)!

  const brandItems = useMemo(
    () => allItems.filter((i) => i.brand === activeBrandId),
    [activeBrandId],
  )

  const filtered = useMemo(
    () => filterItems(brandItems, query, activeCategory),
    [brandItems, query, activeCategory],
  )

  function handleBrandChange(id: BrandId) {
    setActiveBrandId(id)
    setActiveCategory("همه")
    setQuery("")
  }

  const categories = ["همه", ...activeBrand.categories]
  const isFiltered = query.trim() !== "" || activeCategory !== "همه"

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0D1117", color: "#F4E9D8" }}
    >
      {/* ── HEADER ────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between h-14 px-5 border-b backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(13,17,23,0.92)",
          borderColor: "rgba(244,233,216,0.08)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
          style={{ color: "#B8A58F" }}
          aria-label="بازگشت به صفحه اصلی"
        >
          <ArrowRight size={15} />
          کافه گالری
        </Link>
        <h1 className="text-sm font-bold text-[#F4E9D8]">منو کوروش مال</h1>
        <div className="w-20" aria-hidden />
      </header>

      {/* ── BRAND TABS ────────────────────────────────────────────────── */}
      <div
        className="sticky top-14 z-10 px-5 pt-3 pb-0 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(13,17,23,0.95)" }}
      >
        <div
          className="flex rounded-xl p-1 gap-1"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          role="tablist"
          aria-label="برندها"
        >
          {brands.map((brand) => {
            const active = brand.id === activeBrandId
            return (
              <button
                key={brand.id}
                role="tab"
                aria-selected={active}
                onClick={() => handleBrandChange(brand.id)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap"
                style={{
                  backgroundColor: active ? brand.accent : "transparent",
                  color: active ? "#fff" : "rgba(244,233,216,0.5)",
                }}
              >
                {brand.shortTitle}
              </button>
            )
          })}
        </div>

        {/* Search */}
        <div className="relative mt-3">
          <Search
            size={15}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: activeBrand.accent, opacity: 0.7 }}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در منو…"
            className="w-full rounded-xl pr-9 pl-9 py-2.5 text-xs outline-none border border-transparent transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "#F4E9D8",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = `${activeBrand.accent}50`
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "transparent"
            }}
            aria-label="جستجو در منو"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute left-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
              aria-label="پاک کردن"
            >
              <X size={14} style={{ color: "rgba(244,233,216,0.4)" }} />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div
          className="flex gap-1.5 overflow-x-auto py-3"
          style={{ scrollbarWidth: "none" }}
          role="tablist"
          aria-label="دسته‌بندی‌ها"
        >
          {categories.map((cat) => {
            const active = cat === activeCategory
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-3 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap"
                style={{
                  minHeight: 36,
                  backgroundColor: active
                    ? activeBrand.accent
                    : "rgba(255,255,255,0.07)",
                  color: active ? "#fff" : "rgba(244,233,216,0.55)",
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────────── */}
      <main className="px-5 pb-12">
        {/* Result count */}
        <p className="text-[11px] text-[#8A7B68] mb-3">
          {isFiltered
            ? `${toPersianNum(filtered.length)} از ${toPersianNum(brandItems.length)} آیتم`
            : `${toPersianNum(filtered.length)} آیتم`}
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <Search size={36} style={{ color: activeBrand.accent, opacity: 0.3 }} />
            <p className="text-sm text-[#8A7B68]">
              {query ? `نتیجه‌ای برای «${query}» پیدا نشد` : "آیتمی در این دسته موجود نیست"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} brand={activeBrand} />
            ))}
          </div>
        )}
      </main>

      {/* ── FOOTER NOTE ───────────────────────────────────────────────── */}
      <p
        className="text-center text-[11px] pb-8"
        style={{ color: "rgba(184,165,143,0.35)" }}
      >
        تمام قیمت‌ها به تومان است.
      </p>
    </div>
  )
}
