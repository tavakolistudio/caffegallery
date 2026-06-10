"use client"

import { useCart } from "./CartProvider"
import QuantityControl from "./QuantityControl"
import { formatPrice } from "@/lib/formatPrice"
import { toPersian } from "@/lib/persianNumbers"

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, updateNote, totalPrice, totalItems, setView } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <DrawerHeader title="سبد سفارش" onBack={() => setView("menu")} backLabel="ادامه خرید" />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 pb-20">
          <span className="text-7xl select-none">🛒</span>
          <p className="text-[#6B7C6E] font-medium text-base">سبد سفارش شما خالی است</p>
          <button
            onClick={() => setView("menu")}
            className="px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: "#EEF7F2", color: "#1B5C38" }}
          >
            برگشت به منو
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <DrawerHeader
        title={`سبد سفارش (${toPersian(totalItems)})`}
        onBack={() => setView("menu")}
        backLabel="ادامه خرید"
      />

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {items.map(item => (
          <div
            key={item.itemId}
            className="bg-white rounded-2xl p-4"
            style={{ border: "1px solid #E8EFE9" }}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-[#121613] text-sm flex-1 leading-snug">{item.name}</h3>
              <button
                onClick={() => removeItem(item.itemId)}
                className="text-[#C0CBBD] hover:text-red-400 transition text-xl leading-none mr-3 mt-0.5 flex-shrink-0"
                aria-label="حذف از سبد"
              >
                ×
              </button>
            </div>

            <div className="flex items-center justify-between mb-3">
              <QuantityControl
                quantity={item.quantity}
                onIncrease={() => updateQuantity(item.itemId, item.quantity + 1)}
                onDecrease={() => updateQuantity(item.itemId, item.quantity - 1)}
                size="sm"
              />
              <div className="text-left">
                <p className="text-xs text-[#A0B0A4]">
                  {formatPrice(item.price)} × {toPersian(item.quantity)}
                </p>
                <p className="font-bold text-sm" style={{ color: "#D97739" }}>
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>

            <textarea
              value={item.note}
              onChange={e => updateNote(item.itemId, e.target.value)}
              placeholder="توضیحات برای این غذا..."
              rows={1}
              className="w-full px-3 py-2 rounded-xl text-xs text-[#121613] resize-none outline-none border transition"
              style={{
                background: "#FAFDFB",
                borderColor: "#E2EDE8",
                fontFamily: "var(--font-vazirmatn), sans-serif",
              }}
              onFocus={e => { e.target.style.borderColor = "#1B5C38" }}
              onBlur={e => { e.target.style.borderColor = "#E2EDE8" }}
            />
          </div>
        ))}
      </div>

      <div
        className="px-5 py-4 space-y-3 border-t"
        style={{
          borderColor: "#E2EDE8",
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[#6B7C6E] text-sm">جمع کل</span>
          <span className="font-bold text-lg" style={{ color: "#D97739" }}>
            {formatPrice(totalPrice)}
          </span>
        </div>
        <button
          onClick={() => setView("checkout")}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:scale-[0.99]"
          style={{ background: "#1B5C38" }}
        >
          ثبت سفارش
        </button>
      </div>
    </div>
  )
}

function DrawerHeader({
  title,
  onBack,
  backLabel,
}: {
  title: string
  onBack: () => void
  backLabel: string
}) {
  return (
    <div
      className="flex items-center justify-between px-5 py-4 border-b"
      style={{ borderColor: "#E2EDE8" }}
    >
      <button
        onClick={onBack}
        className="text-sm font-medium flex items-center gap-1 transition-opacity hover:opacity-70"
        style={{ color: "#1B5C38" }}
      >
        <span className="text-base">←</span>
        <span>{backLabel}</span>
      </button>
      <h2 className="font-bold text-[#121613] text-base">{title}</h2>
      <div className="w-20" />
    </div>
  )
}
