import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "منو کوروش مال | کافه گالری",
  description: "منوی آنلاین کافه گالری، سوشی گالری و پاستا گالری کوروش مال",
}

export default function KorushMenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
