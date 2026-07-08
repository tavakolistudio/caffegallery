"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { cartTotal, cartCount, type CartItem } from "@/lib/cart"
import type { MenuItem } from "@/data/menu"

export type MenuView = "menu" | "cart" | "checkout" | "success"

interface CartContextType {
  items: CartItem[]
  view: MenuView
  setView: (v: MenuView) => void
  addItem: (item: MenuItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  updateNote: (id: string, note: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartCtx = createContext<CartContextType | null>(null)

export function useCart(): CartContextType {
  const c = useContext(CartCtx)
  if (!c) throw new Error("useCart must be used within CartProvider")
  return c
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [view, setView] = useState<MenuView>("menu")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    try {
      const s = localStorage.getItem("soshi-cart")
      if (s) setItems(JSON.parse(s))
    } catch {}
  }, [])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem("soshi-cart", JSON.stringify(items))
  }, [items, ready])

  function addItem(item: MenuItem) {
    setItems(prev => {
      const ex = prev.find(i => i.itemId === item.id)
      if (ex) return prev.map(i => i.itemId === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { itemId: item.id, name: item.name, price: item.price, quantity: 1, note: "" }]
    })
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.itemId !== id))
  }

  function updateQuantity(id: string, qty: number) {
    if (qty <= 0) { removeItem(id); return }
    setItems(prev => prev.map(i => i.itemId === id ? { ...i, quantity: qty } : i))
  }

  function updateNote(id: string, note: string) {
    setItems(prev => prev.map(i => i.itemId === id ? { ...i, note } : i))
  }

  return (
    <CartCtx.Provider value={{
      items, view, setView, addItem, removeItem, updateQuantity, updateNote,
      clearCart: () => setItems([]),
      totalItems: cartCount(items),
      totalPrice: cartTotal(items),
    }}>
      <div
        dir="rtl"
        style={{
          background: "#FAFFFA",
          minHeight: "100dvh",
          color: "#121613",
          fontFamily: "var(--font-vazirmatn), Vazirmatn, sans-serif",
        }}
      >
        {children}
      </div>
    </CartCtx.Provider>
  )
}
