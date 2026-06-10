import type { CartItem } from "./cart"
import { restaurantConfig } from "@/config/restaurant"
import { formatPrice } from "./formatPrice"
import { toPersian } from "./persianNumbers"

export type OrderType = "table" | "takeaway" | "delivery"

export interface OrderForm {
  customerName: string
  phone: string
  orderType: OrderType
  tableNumber: string
  address: string
  generalNote: string
}

export const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  table: "سفارش روی میز",
  takeaway: "بیرون‌بر",
  delivery: "ارسال",
}

export function buildWhatsAppMessage(
  form: OrderForm,
  items: CartItem[],
  total: number,
): string {
  const lines: string[] = [
    `🍱 سفارش جدید ${restaurantConfig.restaurantName}`,
    "",
    `نام مشتری: ${form.customerName}`,
    `شماره تماس: ${form.phone}`,
    `نوع سفارش: ${ORDER_TYPE_LABELS[form.orderType]}`,
  ]

  if (form.orderType === "table" && form.tableNumber)
    lines.push(`شماره میز: ${toPersian(form.tableNumber)}`)
  if (form.orderType === "delivery" && form.address)
    lines.push(`آدرس: ${form.address}`)

  lines.push("", "موارد سفارش:")

  items.forEach((item, i) => {
    lines.push(
      "",
      `${toPersian(i + 1)}. ${item.name}`,
      `   تعداد: ${toPersian(item.quantity)}`,
      `   قیمت واحد: ${formatPrice(item.price)}`,
      `   جمع: ${formatPrice(item.price * item.quantity)}`,
    )
    if (item.note) lines.push(`   توضیحات: ${item.note}`)
  })

  lines.push("", `💰 مبلغ نهایی: ${formatPrice(total)}`)

  if (form.generalNote)
    lines.push("", `📝 توضیحات سفارش: ${form.generalNote}`)

  return lines.join("\n")
}

export function openWhatsApp(message: string): void {
  window.open(
    `https://wa.me/${restaurantConfig.whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank",
  )
}
