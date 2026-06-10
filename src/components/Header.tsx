"use client"
import { useState, useEffect, useRef } from "react"
import { X, ChevronDown } from "lucide-react"
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
    { label: "گالری", href: "#gallery" },
    { label: "شعبه‌ها", href: "#branches" },
    {
      label: "منو",
      href: null,
      children: [{ label: "منو سوشی", href: "/menu/soshi" }],
    },
    { label: "درباره", href: "#about" },
    { label: "تماس", href: "#contact" },
  ],
  en: [
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
      className="fixed top-0 left-0 right-0 z-50 bg-[#fafffa] border-b border-[#121613]/8"
    >
      <div className="max-w-[1440px] mx-auto px-[50px] h-[60px] flex items-center justify-between">
        {/* Wordmark — "کافه" Obsidian + "گالری" Voltage */}
        <a href="#hero" className="flex items-baseline gap-0 leading-none">
          <span className="text-[14px] font-semibold text-[#121613] tracking-tight">
            {lang === "fa" ? "کافه" : "Caffe"}
          </span>
          <span className="text-[14px] font-semibold text-[#2bee4b] tracking-tight">
            {lang === "fa" ? "گالری" : "gallery"}
          </span>
        </a>

        {/* Desktop nav — minimal ghost links */}
        <nav ref={dropdownRef} className="hidden md:flex items-center gap-8">
          {links.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className="flex items-center gap-1 text-[13px] text-[#516254] hover:text-[#121613] transition-colors"
                >
                  {link.label}
                  <ChevronDown size={12} className={cn("transition-transform duration-150", openDropdown === link.label ? "rotate-180" : "")} />
                </button>
                {openDropdown === link.label && (
                  <div className={cn(
                    "absolute top-full mt-2 bg-[#fafffa] border border-[#121613]/10 rounded-[10px] overflow-hidden min-w-[130px] shadow-sm",
                    isRtl ? "right-0" : "left-0"
                  )}>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2.5 text-[13px] text-[#516254] hover:text-[#121613] hover:bg-[#121613]/4 transition-colors whitespace-nowrap"
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
                className="text-[13px] text-[#516254] hover:text-[#121613] transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Right cluster — sound + lang + mobile toggle */}
        <div className="flex items-center gap-4">
          <SoundToggle />
          <LanguageSwitcher />
          {/* Mobile menu trigger — just text label */}
          <button
            className="md:hidden text-[13px] text-[#516254] hover:text-[#121613] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={16} /> : (lang === "fa" ? "منو" : "Menu")}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#fafffa] border-t border-[#121613]/8 px-[50px] py-6">
          <nav className="flex flex-col gap-5">
            {links.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="text-[11px] text-[#516254] uppercase tracking-[0.11px] mb-2">{link.label}</p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-[14px] text-[#121613] hover:text-[#2bee4b] transition-colors py-1"
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
                  className="text-[14px] text-[#121613] hover:text-[#2bee4b] transition-colors"
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
