"use client"
import { useLang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()

  return (
    <div className="flex items-center gap-1 bg-[#f0f4f0] border border-[#121613]/10 rounded-full p-1">
      <button
        onClick={() => setLang("fa")}
        className={cn(
          "px-3 py-1 rounded-full text-sm font-medium transition-all duration-200",
          lang === "fa"
            ? "bg-[#2bee4b] text-[#121613]"
            : "text-[#516254] hover:text-[#121613]"
        )}
      >
        FA
      </button>
      <button
        onClick={() => setLang("en")}
        className={cn(
          "px-3 py-1 rounded-full text-sm font-medium transition-all duration-200",
          lang === "en"
            ? "bg-[#2bee4b] text-[#121613]"
            : "text-[#516254] hover:text-[#121613]"
        )}
      >
        EN
      </button>
    </div>
  )
}
