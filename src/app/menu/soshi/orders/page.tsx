"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { loadOrders, type SavedOrder } from "@/lib/orderStorage"
import { formatPrice } from "@/lib/formatPrice"
import { toPersian } from "@/lib/persianNumbers"

export default function OrdersPage() {
  const [orders, setOrders] = useState<SavedOrder[]>([])

  useEffect(() => {
    setOrders(loadOrders())
  }, [])

  return (
    <>
      <header
        className="sticky top-0 border-b px-5 py-4"
        style={{ background: "#FAFFFA", borderColor: "#E2EDE8" }}
      >
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <Link
            href="/menu/soshi"
            className="text-sm font-medium flex items-center gap-1"
            style={{ color: "#1B5C38" }}
          >
            <span className="text-base">←</span>
            <span>بازگشت به منو</span>
          </Link>
          <h1 className="font-bold text-base text-[#121613]">سفارش‌های من</h1>
          <div className="w-24" />
        </div>
      </header>

      <div
        className="px-5 py-4 max-w-2xl mx-auto space-y-4"
        style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
      >
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <span className="text-6xl select-none">📋</span>
            <div>
              <p className="font-bold text-[#121613] text-base mb-1">سفارشی ثبت نشده</p>
              <p className="text-sm text-[#6B7C6E]">
                سفارش‌های ارسال‌شده اینجا نمایش داده می‌شوند
              </p>
            </div>
            <Link
              href="/menu/soshi"
              className="px-7 py-3 rounded-xl text-sm font-bold text-white"
              style={{ background: "#1B5C38" }}
            >
              رفتن به منو
            </Link>
          </div>
        ) : (
          orders.map(order => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </>
  )
}

function OrderCard({ order }: { order: SavedOrder }) {
  const date = new Date(order.date)
  const dateStr = date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const timeStr = date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div
      className="bg-white rounded-2xl p-4 space-y-3"
      style={{
        border: "1px solid #E8EFE9",
        boxShadow: "0 1px 8px rgba(27,92,56,0.05)",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: "#EEF7F2", color: "#1B5C38" }}
        >
          ارسال شده به واتساپ
        </span>
        <span className="text-xs text-[#A0B0A4]">
          {dateStr} — {timeStr}
        </span>
      </div>

      <div>
        <p className="font-bold text-[#121613] text-sm">{order.customerName}</p>
        <p className="text-xs text-[#6B7C6E] mt-0.5">
          {order.orderType} • {order.phone}
        </p>
      </div>

      <div
        className="space-y-1.5 py-2 border-y"
        style={{ borderColor: "#F0F7F2" }}
      >
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-sm text-[#121613]">
              {toPersian(item.quantity)}× {item.name}
            </span>
            <span className="text-xs text-[#6B7C6E]">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-[#6B7C6E]">مبلغ کل</span>
        <span className="font-bold text-base" style={{ color: "#D97739" }}>
          {formatPrice(order.totalPrice)}
        </span>
      </div>
    </div>
  )
}
