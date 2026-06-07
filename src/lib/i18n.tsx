"use client"
import { createContext, useContext, useState, ReactNode } from "react"

type Locale = "fa" | "en"

interface LangContext {
  lang: Locale
  setLang: (l: Locale) => void
  isRtl: boolean
}

const Ctx = createContext<LangContext>({ lang: "fa", setLang: () => {}, isRtl: true })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>("fa")
  return <Ctx.Provider value={{ lang, setLang, isRtl: lang === "fa" }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
