"use client"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useLang } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import LanguageSwitcher from "./LanguageSwitcher"
import SoundToggle from "./SoundToggle"

type NavChild = { label: string; href: string }
type NavLink =
  | { label: string; href: string; children?: undefined }
  | { label: string; href: null; children: NavChild[] }

const navLinks: Record<"fa" | "en", NavLink[]> = {
  fa: [
    { label: "صفحه اول", href: "#hero" },
    { label: "گالری", href: "#gallery" },
    { label: "شعبه‌ها", href: "#branches" },
    {
      label: "منو",
      href: null,
      children: [{ label: "منو سوشی", href: "/menu/soshi" }],
    },
    { label: "درباره ما", href: "#about" },
    { label: "تماس با ما", href: "#contact" },
  ],
  en: [
    { label: "Home", href: "#hero" },
    { label: "Gallery", href: "#gallery" },
    { label: "Branches", href: "#branches" },
    {
      label: "Menu",
      href: null,
      children: [{ label: "Sushi Menu", href: "/menu/soshi" }],
    },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
}

export default function Header() {
  const { lang, isRtl } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const links = navLinks[lang]

  return (
    <header
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#fafffa]/95 backdrop-blur-md border-b border-[#121613]/8"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo — split-color wordmark */}
        <a href="#hero" className="flex flex-col leading-none group">
          <span className="text-lg font-bold leading-tight">
            <span className="text-[#2bee4b]">{lang === "fa" ? "کافه" : "Caffe"}</span>
            <span className="text-[#121613]">{lang === "fa" ? " گالری" : "gallery"}</span>
          </span>
          <span className="text-[9px] text-[#516254] tracking-[0.3em] uppercase">
            {lang === "fa" ? "Caffegallery" : "کافه گالری"}
          </span>
        </a>

        {/* Desktop nav */}
        <nav ref={dropdownRef} className="hidden md:flex items-center gap-7">
          {links.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className="flex items-center gap-1 text-sm text-[#516254] hover:text-[#121613] transition-colors duration-200"
                >
                  {link.label}
                  <ChevronDown
                    size={13}
                    className={cn("transition-transform duration-200", openDropdown === link.label ? "rotate-180" : "")}
                  />
                </button>
                {openDropdown === link.label && (
                  <div
                    className={cn(
                      "absolute top-full mt-2 bg-[#fafffa] border border-[#121613]/10 rounded-xl overflow-hidden shadow-sm min-w-[140px]",
                      isRtl ? "right-0" : "left-0"
                    )}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2.5 text-sm text-[#516254] hover:text-[#121613] hover:bg-[#121613]/4 transition-colors whitespace-nowrap"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#516254] hover:text-[#121613] transition-colors duration-200"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <SoundToggle />
          <LanguageSwitcher />
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-[#121613]/12 text-[#516254] hover:text-[#121613] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#fafffa]/98 backdrop-blur-md border-b border-[#121613]/8 px-6 pb-6">
          <nav className="flex flex-col gap-4 pt-2">
            {links.map((link) =>
              link.children ? (
                <div key={link.label} className="border-b border-[#121613]/6">
                  <p className="text-xs text-[#2bee4b] font-semibold py-1 tracking-wide">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block text-sm text-[#516254] hover:text-[#121613] transition-colors py-1.5",
                        isRtl ? "pr-3" : "pl-3"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-[#516254] hover:text-[#121613] transition-colors py-1 border-b border-[#121613]/6"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
