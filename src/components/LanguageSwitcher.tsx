"use client"
import { useLang } from "@/lib/i18n"

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setLang("fa")}
        className={`text-[13px] transition-colors ${
          lang === "fa" ? "text-[#121613] font-medium" : "text-[#516254] hover:text-[#121613]"
        }`}
      >
        FA
      </button>
      <span className="text-[#516254]/30 text-[11px]">/</span>
      <button
        onClick={() => setLang("en")}
        className={`text-[13px] transition-colors ${
          lang === "en" ? "text-[#121613] font-medium" : "text-[#516254] hover:text-[#121613]"
        }`}
      >
        EN
      </button>
    </div>
  )
}
