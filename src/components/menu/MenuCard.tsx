"use client"

import { useCart } from "./CartProvider"
import QuantityControl from "./QuantityControl"
import type { MenuItem } from "@/data/menu"
import { formatPrice } from "@/lib/formatPrice"

export default function MenuCard({ item }: { item: MenuItem }) {
  const { items, addItem, updateQuantity } = useCart()
  const cartItem = items.find(c => c.itemId === item.id)

  return (
    <div
      className="bg-white rounded-2xl p-4 flex flex-col gap-3"
      style={{
        border: "1px solid #E8EFE9",
        boxShadow: "0 1px 8px rgba(27,92,56,0.06)",
      }}
    >
      {item.image && (
        <div
          className="relative w-full overflow-hidden rounded-xl -mt-1"
          style={{ aspectRatio: "3 / 2", background: "#EEF7F2" }}
        >
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: item.available ? 1 : 0.5 }}
          />
        </div>
      )}

      <div>
        <h3 className="font-bold text-[#121613] text-[15px] leading-snug">{item.name}</h3>
        {item.ingredients && (
          <p className="text-sm text-[#6B7C6E] mt-1 leading-relaxed">{item.ingredients}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-bold text-sm" style={{ color: "#D97739" }}>
          {formatPrice(item.price)}
        </span>

        {!item.available ? (
          <span className="text-xs text-[#A0B0A4] bg-[#F5F5F5] px-3 py-1.5 rounded-xl">
            موجود نیست
          </span>
        ) : cartItem ? (
          <QuantityControl
            quantity={cartItem.quantity}
            onIncrease={() => updateQuantity(item.id, cartItem.quantity + 1)}
            onDecrease={() => updateQuantity(item.id, cartItem.quantity - 1)}
            size="sm"
          />
        ) : (
          <button
            onClick={() => addItem(item)}
            className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
            style={{ background: "#1B5C38" }}
          >
            افزودن
          </button>
        )}
      </div>
    </div>
  )
}
