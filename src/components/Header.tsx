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
          ? "bg-[#080604]/95 backdrop-blur-md border-b border-[rgba(244,233,216,0.1)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#hero" className="flex flex-col leading-none group">
          <span className="text-lg font-bold text-[#F4E9D8] group-hover:text-[#C58A45] transition-colors">
            {lang === "fa" ? "کافه گالری" : "Caffegallery"}
          </span>
          <span className="text-[10px] text-[#B8A58F] tracking-widest uppercase">
            {lang === "fa" ? "Caffegallery" : "کافه گالری"}
          </span>
        </a>

        {/* Desktop nav */}
        <nav ref={dropdownRef} className="hidden md:flex items-center gap-6">
          {links.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className="flex items-center gap-1 text-sm text-[#B8A58F] hover:text-[#C58A45] transition-colors duration-200"
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={cn("transition-transform duration-200", openDropdown === link.label ? "rotate-180" : "")}
                  />
                </button>
                {openDropdown === link.label && (
                  <div
                    className={cn(
                      "absolute top-full mt-2 bg-[#120E0A] border border-[rgba(244,233,216,0.12)] rounded-lg overflow-hidden shadow-lg min-w-[140px]",
                      isRtl ? "right-0" : "left-0"
                    )}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2.5 text-sm text-[#B8A58F] hover:text-[#C58A45] hover:bg-[rgba(244,233,216,0.05)] transition-colors whitespace-nowrap"
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
                className="text-sm text-[#B8A58F] hover:text-[#C58A45] transition-colors duration-200"
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
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(244,233,216,0.12)] text-[#B8A58F] hover:text-[#C58A45] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#080604]/98 backdrop-blur-md border-b border-[rgba(244,233,216,0.1)] px-6 pb-6">
          <nav className="flex flex-col gap-4 pt-2">
            {links.map((link) =>
              link.children ? (
                <div key={link.label} className="border-b border-[rgba(244,233,216,0.06)]">
                  <p className="text-xs text-[#C58A45] font-semibold py-1 tracking-wide">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block text-sm text-[#B8A58F] hover:text-[#C58A45] transition-colors py-1.5",
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
                  className="text-sm text-[#B8A58F] hover:text-[#C58A45] transition-colors py-1 border-b border-[rgba(244,233,216,0.06)]"
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
