"use client"

import { useState, type ReactNode } from "react"
import { useCart } from "./CartProvider"
import {
  type OrderForm,
  type OrderType,
  ORDER_TYPE_LABELS,
  buildWhatsAppMessage,
  openWhatsApp,
} from "@/lib/whatsapp"
import { saveOrder } from "@/lib/orderStorage"
import { formatPrice } from "@/lib/formatPrice"

const INITIAL: OrderForm = {
  customerName: "",
  phone: "",
  orderType: "table",
  tableNumber: "",
  address: "",
  generalNote: "",
}

export default function CheckoutForm() {
  const { items, totalPrice, clearCart, setView } = useCart()
  const [form, setForm] = useState<OrderForm>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>({})

  function set(field: keyof OrderForm, value: string) {
    setForm(p => ({ ...p, [field]: value }))
    setErrors(p => ({ ...p, [field]: undefined }))
  }

  function validate(): boolean {
    const e: Partial<Record<keyof OrderForm, string>> = {}
    if (!form.customerName.trim()) e.customerName = "نام الزامی است"
    if (!form.phone.trim()) e.phone = "شماره تماس الزامی است"
    if (form.orderType === "table" && !form.tableNumber.trim())
      e.tableNumber = "شماره میز الزامی است"
    if (form.orderType === "delivery" && !form.address.trim())
      e.address = "آدرس الزامی است"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    const msg = buildWhatsAppMessage(form, items, totalPrice)
    saveOrder(form, items, totalPrice)
    openWhatsApp(msg)
    clearCart()
    setView("success")
  }

  const inputBase =
    "w-full px-4 py-3 rounded-xl border text-[#121613] text-sm outline-none transition bg-white"

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: "#E2EDE8" }}
      >
        <button
          onClick={() => setView("cart")}
          className="text-sm font-medium flex items-center gap-1 transition-opacity hover:opacity-70"
          style={{ color: "#1B5C38" }}
        >
          <span className="text-base">←</span>
          <span>بازگشت</span>
        </button>
        <h2 className="font-bold text-[#121613] text-base">اطلاعات سفارش</h2>
        <div className="w-20" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {/* Name */}
        <Field label="نام مشتری" required error={errors.customerName}>
          <input
            className={inputBase}
            style={{
              borderColor: errors.customerName ? "#EF4444" : "#E2EDE8",
              fontFamily: "var(--font-vazirmatn), sans-serif",
            }}
            placeholder="نام خود را وارد کنید"
            value={form.customerName}
            onChange={e => set("customerName", e.target.value)}
          />
        </Field>

        {/* Phone */}
        <Field label="شماره تماس" required error={errors.phone}>
          <input
            className={inputBase}
            style={{
              borderColor: errors.phone ? "#EF4444" : "#E2EDE8",
              direction: "ltr",
              textAlign: "left",
            }}
            placeholder="09120000000"
            type="tel"
            value={form.phone}
            onChange={e => set("phone", e.target.value)}
          />
        </Field>

        {/* Order Type */}
        <Field label="نوع سفارش">
          <div className="grid grid-cols-3 gap-2">
            {(["table", "takeaway", "delivery"] as OrderType[]).map(t => (
              <button
                key={t}
                onClick={() => set("orderType", t)}
                className="py-2.5 px-1 rounded-xl text-xs font-semibold transition-all"
                style={{
                  background: form.orderType === t ? "#1B5C38" : "#EEF7F2",
                  color: form.orderType === t ? "#FFFFFF" : "#1B5C38",
                  border: `1.5px solid ${form.orderType === t ? "#1B5C38" : "#D4E8DA"}`,
                }}
              >
                {ORDER_TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        </Field>

        {/* Table Number */}
        {form.orderType === "table" && (
          <Field label="شماره میز" required error={errors.tableNumber}>
            <input
              className={inputBase}
              style={{
                borderColor: errors.tableNumber ? "#EF4444" : "#E2EDE8",
                fontFamily: "var(--font-vazirmatn), sans-serif",
              }}
              placeholder="مثلاً ۵"
              value={form.tableNumber}
              onChange={e => set("tableNumber", e.target.value)}
            />
          </Field>
        )}

        {/* Address */}
        {form.orderType === "delivery" && (
          <Field label="آدرس" required error={errors.address}>
            <textarea
              className={`${inputBase} resize-none`}
              style={{
                borderColor: errors.address ? "#EF4444" : "#E2EDE8",
                fontFamily: "var(--font-vazirmatn), sans-serif",
              }}
              placeholder="آدرس کامل ارسال را وارد کنید"
              rows={3}
              value={form.address}
              onChange={e => set("address", e.target.value)}
            />
          </Field>
        )}

        {/* Note */}
        <Field label="توضیحات سفارش">
          <textarea
            className={`${inputBase} resize-none`}
            style={{
              borderColor: "#E2EDE8",
              fontFamily: "var(--font-vazirmatn), sans-serif",
            }}
            placeholder="توضیحات کلی سفارش..."
            rows={2}
            value={form.generalNote}
            onChange={e => set("generalNote", e.target.value)}
          />
        </Field>

        {/* Summary */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "#EEF7F2", border: "1px solid #D4E8DA" }}
        >
          <p className="text-sm text-[#516254] mb-1.5">{items.length} آیتم در سفارش</p>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#121613] text-sm">مبلغ کل</span>
            <span className="font-bold text-base" style={{ color: "#D97739" }}>
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>
      </div>

      <div
        className="px-5 py-4 border-t"
        style={{
          borderColor: "#E2EDE8",
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          style={{ background: "#1B5C38" }}
        >
          <span>ارسال سفارش از واتساپ</span>
          <span>📲</span>
        </button>
      </div>
    </div>
  )
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#121613] mb-1.5">
        {label}
        {required && <span className="text-red-400 mr-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
