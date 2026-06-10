import type { Metadata } from "next"
import CartProvider from "@/components/menu/CartProvider"

export const metadata: Metadata = {
  title: "منو سوشی گالری | کافه گالری",
  description: "منو آنلاین و سفارش سوشی — کافه گالری",
}

export default function SoshiLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
