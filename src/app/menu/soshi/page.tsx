"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/menu/CartProvider"
import { menuItems as staticItems, menuCategories } from "@/data/menu"
import type { MenuCategory, MenuItem } from "@/data/menu"
import MenuCard from "@/components/menu/MenuCard"
import CartDrawer from "@/components/menu/CartDrawer"
import CheckoutForm from "@/components/menu/CheckoutForm"
import { formatPrice } from "@/lib/formatPrice"
import { toPersian } from "@/lib/persianNumbers"

// null = category grid (home), string = inside a category
type Screen = "home" | string

type CustomMenuItem = {
  id: string
  category: string
  name: string
  ingredients?: string | null
  price: number
  available?: boolean | null
  image?: string | null
}
type CustomCategory = MenuCategory
type SoshiMenuItem = MenuItem & { deleted?: boolean }

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

export default function SoshiMenuPage() {
  const { view, setView, totalItems, totalPrice } = useCart()
  const [screen, setScreen] = useState<Screen>("home")
  const [search, setSearch] = useState("")
  const [menuItems, setMenuItems] = useState<SoshiMenuItem[]>(staticItems)
  const [categories, setCategories] = useState<MenuCategory[]>(menuCategories)

  // Fetch custom items plus live price / availability / name / image overrides
  useEffect(() => {
    Promise.all([
      fetch("/api/admin/soshi/items").then((r) => r.json()).catch(() => []),
      fetch("/api/admin/soshi/categories").then((r) => r.json()).catch(() => []),
      fetch("/api/admin/soshi/prices").then((r) => r.json()).catch(() => []),
    ])
      .then(([customRows, categoryRows, overrideRows]: [
        CustomMenuItem[],
        CustomCategory[],
        {
        item_id: string
        price: number | null
        available: boolean | null
        name: string | null
        image: string | null
      }[]
      ]) => {
        const customCategories = Array.isArray(categoryRows) ? categoryRows : []
        setCategories([...menuCategories, ...customCategories])

        const customItems: SoshiMenuItem[] = Array.isArray(customRows)
          ? customRows.map((item) => ({
              id: item.id,
              category: item.category,
              name: item.name,
              ingredients: item.ingredients ?? "",
              price: item.price,
              available: item.available ?? true,
              ...(item.image ? { image: item.image } : {}),
            }))
          : []
        const baseItems = [...staticItems, ...customItems]

        const map: Record<string, Partial<MenuItem>> = {}
        if (!Array.isArray(overrideRows) || !overrideRows.length) {
          setMenuItems(baseItems)
          return
        }
        overrideRows.forEach(({ item_id, price, available, name, image }) => {
          const decoded = displayText(name)
          map[item_id] = {
            ...(price !== null ? { price } : {}),
            ...(available !== null ? { available } : {}),
            ...(decoded.name ? { name: decoded.name } : {}),
            ...(decoded.structured ? { ingredients: decoded.ingredients } : {}),
            ...(decoded.deleted ? { deleted: true } : {}),
            // "" = admin explicitly removed the photo; a URL = custom photo
            ...(image !== null ? { image: image || undefined } : {}),
          }
        })
        setMenuItems(baseItems.map((item) =>
          map[item.id] ? { ...item, ...map[item.id] } : item
        ))
      })
      .catch(() => {})
  }, [])

  const isSearching = search.trim().length > 0
  const activeCategory = categories.find(c => c.id === screen)

  const categoryItemCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    categories.forEach(cat => {
      counts[cat.id] = menuItems.filter(i => i.category === cat.id && i.available && !i.deleted).length
    })
    return counts
  }, [categories, menuItems])

  // only categories that have at least one item
  const activeCategories = useMemo(
    () => categories.filter(cat => categoryItemCounts[cat.id] > 0),
    [categories, categoryItemCounts],
  )

  const filtered = useMemo(() => {
    if (isSearching) {
      const q = search.trim().toLowerCase()
      return menuItems.filter(
        i =>
          !i.deleted &&
          i.name.toLowerCase().includes(q) ||
          (!i.deleted && i.ingredients.toLowerCase().includes(q)),
      )
    }
    if (screen !== "home") return menuItems.filter(i => i.category === screen && !i.deleted)
    return []
  }, [search, screen, isSearching, menuItems])

  return (
    <>
      {/* ── FULL-SCREEN OVERLAYS ─────────────────────────────────────── */}
      {view !== "menu" && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#FAFFFA" }}>
          {view === "cart" && <CartDrawer />}
          {view === "checkout" && <CheckoutForm />}
          {view === "success" && <SuccessScreen />}
        </div>
      )}

      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-20 border-b"
        style={{ background: "#FAFFFA", borderColor: "#E2EDE8" }}
      >
        <div className="flex items-center justify-between px-5 py-4 max-w-2xl mx-auto">
          {/* Left slot */}
          {screen !== "home" && !isSearching ? (
            <button
              onClick={() => setScreen("home")}
              className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "#1B5C38" }}
            >
              <span className="text-base leading-none">←</span>
              <span>دسته‌بندی‌ها</span>
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
              style={{ color: "#516254" }}
            >
              <Image
                src="/images/brand/cafe-gallery-logo-black.png"
                alt=""
                width={48}
                height={47}
                className="w-8 h-8 rounded-md"
              />
              <span>صفحه اصلی</span>
            </Link>
          )}

          {/* Center title — tap to go home */}
          <button
            onClick={() => { setScreen("home"); setSearch("") }}
            className="font-bold text-base text-[#121613] transition-opacity hover:opacity-70"
          >
            {screen !== "home" && !isSearching
              ? activeCategory?.name
              : "منو سوشی گالری"}
          </button>

          {/* Right slot */}
          <Link
            href="/menu/soshi/orders"
            className="text-xs font-medium"
            style={{ color: "#1B5C38" }}
          >
            سفارش‌ها
          </Link>
        </div>
      </header>

      {/* ── SEARCH ──────────────────────────────────────────────────── */}
      <div className="px-5 pt-4 pb-3 max-w-2xl mx-auto">
        <div className="relative">
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0B0A4] text-base pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="جستجوی غذا در همه دسته‌ها..."
            className="w-full py-3 pr-11 pl-10 rounded-2xl text-sm border outline-none transition text-[#121613]"
            style={{
              background: "#FFFFFF",
              borderColor: search ? "#1B5C38" : "#E2EDE8",
              fontFamily: "var(--font-vazirmatn), sans-serif",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0B0A4] hover:text-[#6B7C6E] text-xl leading-none"
              aria-label="پاک کردن جستجو"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <main
        className="px-5 max-w-2xl mx-auto"
        style={{ paddingBottom: "8rem" }}
      >
        {isSearching ? (
          /* ── SEARCH RESULTS ── */
          <>
            {filtered.length > 0 && (
              <p className="text-sm text-[#6B7C6E] mb-4">
                {toPersian(filtered.length)} نتیجه در همه دسته‌ها
              </p>
            )}
            {filtered.length === 0 ? (
              <EmptySearch />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filtered.map(item => <MenuCard key={item.id} item={item} />)}
              </div>
            )}
          </>
        ) : screen === "home" ? (
          /* ── CATEGORY GRID (HOME) ── */
          <>
            <p
              className="text-xs font-semibold tracking-widest text-center mb-4 mt-1"
              style={{ color: "#A0B0A4", letterSpacing: "0.2em" }}
            >
              — انتخاب دسته‌بندی —
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setScreen(cat.id)}
                  className="relative overflow-hidden rounded-2xl transition-all active:scale-[0.97] text-right"
                  style={{
                    aspectRatio: "4/3",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                  }}
                >
                  {cat.image && (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {/* gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
                    }}
                  />
                  {/* text */}
                  <div className="absolute bottom-0 right-0 left-0 p-3">
                    <p className="font-bold text-white text-[14px] leading-snug drop-shadow">
                      {cat.name}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {toPersian(categoryItemCounts[cat.id])} غذا
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          /* ── CATEGORY ITEMS ── */
          <>
            {/* Quick category switcher */}
            <div className="mb-4 pt-1">
              <div className="flex flex-wrap justify-center gap-2">
                {activeCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setScreen(cat.id)}
                    className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
                    style={{
                      background: screen === cat.id ? "#1B5C38" : "#EEF7F2",
                      color: screen === cat.id ? "#FFFFFF" : "#516254",
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map(item => <MenuCard key={item.id} item={item} />)}
            </div>

            {/* Back to categories button at bottom */}
            <button
              onClick={() => setScreen("home")}
              className="mt-6 w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
              style={{ background: "#EEF7F2", color: "#1B5C38", border: "1px solid #D4E8DA" }}
            >
              <span>←</span>
              <span>بازگشت به همه دسته‌بندی‌ها</span>
            </button>
          </>
        )}
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="flex flex-col items-center py-8 px-4">
        <a
          href="https://tavakolistudio.vercel.app/en"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 group"
        >
          <span className="text-[10px] transition-opacity" style={{ color: "rgba(81,98,84,0.5)" }}>
            Powered by
          </span>
          <span
            className="text-[11px] font-bold tracking-widest transition-opacity group-hover:opacity-100"
            style={{ color: "rgba(27,92,56,0.6)", fontFamily: "monospace", letterSpacing: "0.12em" }}
          >
            TAVAKOLISTUDIO
          </span>
        </a>
      </footer>

      {/* ── STICKY CART BUTTON ──────────────────────────────────────── */}
      {totalItems > 0 && view === "menu" && (
        <div
          className="fixed bottom-0 left-0 right-0 z-30 px-5"
          style={{
            paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
            paddingTop: "2rem",
            background: "linear-gradient(to top, #FAFFFA 55%, transparent)",
          }}
        >
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setView("cart")}
              className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-between px-5 transition-all active:scale-[0.99]"
              style={{
                background: "#1B5C38",
                boxShadow: "0 4px 24px rgba(27,92,56,0.3)",
              }}
            >
              <span
                className="text-sm font-bold rounded-full px-2.5 py-0.5"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                {toPersian(totalItems)}
              </span>
              <span>مشاهده سفارش</span>
              <span className="text-sm opacity-90">{formatPrice(totalPrice)}</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function EmptySearch() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <span className="text-6xl select-none">🔍</span>
      <p className="text-[#6B7C6E] font-medium text-base">غذایی پیدا نشد</p>
    </div>
  )
}

function SuccessScreen() {
  const { setView } = useCart()
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{ background: "#EEF7F2" }}
      >
        <span className="text-5xl">✅</span>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-[#121613] mb-2">سفارش ارسال شد!</h2>
        <p className="text-[#6B7C6E] text-base leading-relaxed max-w-xs mx-auto">
          سفارش شما از طریق واتساپ ارسال شد. لطفاً منتظر تأیید از کافه گالری باشید.
        </p>
      </div>
      <button
        onClick={() => setView("menu")}
        className="px-10 py-4 rounded-2xl text-white font-bold text-base"
        style={{ background: "#1B5C38" }}
      >
        بازگشت به منو
      </button>
      <Link
        href="/menu/soshi/orders"
        className="text-sm font-medium"
        style={{ color: "#516254" }}
      >
        مشاهده سفارش‌های من
      </Link>
    </div>
  )
}
