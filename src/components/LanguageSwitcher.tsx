"use client"
import { useLang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()

  return (
    <div className="flex items-center gap-1 bg-[#120E0A] border border-[rgba(244,233,216,0.12)] rounded-full p-1">
      <button
        onClick={() => setLang("fa")}
        className={cn(
          "px-3 py-1 rounded-full text-sm font-medium transition-all duration-200",
          lang === "fa"
            ? "bg-[#C58A45] text-[#080604]"
            : "text-[#B8A58F] hover:text-[#F4E9D8]"
        )}
      >
        FA
      </button>
      <button
        onClick={() => setLang("en")}
        className={cn(
          "px-3 py-1 rounded-full text-sm font-medium transition-all duration-200",
          lang === "en"
            ? "bg-[#C58A45] text-[#080604]"
            : "text-[#B8A58F] hover:text-[#F4E9D8]"
        )}
      >
        EN
      </button>
    </div>
  )
}
