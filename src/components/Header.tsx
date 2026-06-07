"use client"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import LanguageSwitcher from "./LanguageSwitcher"
import SoundToggle from "./SoundToggle"

const navLinks = {
  fa: [
    { label: "صفحه اول", href: "#hero" },
    { label: "گالری", href: "#gallery" },
    { label: "شعبه‌ها", href: "#branches" },
    { label: "درباره ما", href: "#about" },
    { label: "تماس با ما", href: "#contact" },
  ],
  en: [
    { label: "Home", href: "#hero" },
    { label: "Gallery", href: "#gallery" },
    { label: "Branches", href: "#branches" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
}

export default function Header() {
  const { lang, isRtl } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
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
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#B8A58F] hover:text-[#C58A45] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <SoundToggle />
          <LanguageSwitcher />
          {/* Hamburger */}
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
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#B8A58F] hover:text-[#C58A45] transition-colors py-1 border-b border-[rgba(244,233,216,0.06)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
