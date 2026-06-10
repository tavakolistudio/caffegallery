import type { Metadata } from "next"
import { Vazirmatn, Inter, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { LangProvider } from "@/lib/i18n"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "کافه گالری | Caffegallery",
  description:
    "کافه گالری — جایی که هنر و قهوه در هم می‌آمیزند. بیش از ۳۰ سال تجربه در تهران، ۹ شعبه فعال. Caffegallery — where art and coffee converge. 30+ years in Tehran, 9 active branches.",
  openGraph: {
    title: "کافه گالری | Caffegallery",
    description: "تجربه‌ای فراتر از یک فنجان قهوه | An experience beyond a cup of coffee",
    type: "website",
    locale: "fa_IR",
  },
  keywords: ["caffegallery", "کافه گالری", "کافه تهران", "cafe tehran", "نادر چنپگیزیان"],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen bg-[#fafffa] text-[#121613]">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  )
}
