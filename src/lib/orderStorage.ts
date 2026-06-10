import type { CartItem } from "./cart"
import type { OrderForm } from "./whatsapp"
import { ORDER_TYPE_LABELS } from "./whatsapp"

export interface SavedOrder {
  id: string
  date: string
  customerName: string
  phone: string
  orderType: string
  items: CartItem[]
  totalPrice: number
  generalNote: string
}

const KEY = "soshi-orders"

export function saveOrder(
  form: OrderForm,
  items: CartItem[],
  total: number,
): SavedOrder {
  const order: SavedOrder = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    customerName: form.customerName,
    phone: form.phone,
    orderType: ORDER_TYPE_LABELS[form.orderType],
    items: [...items],
    totalPrice: total,
    generalNote: form.generalNote,
  }
  const existing = loadOrders()
  localStorage.setItem(KEY, JSON.stringify([order, ...existing]))
  return order
}

export function loadOrders(): SavedOrder[] {
  if (typeof window === "undefined") return []
  try {
    const s = localStorage.getItem(KEY)
    return s ? JSON.parse(s) : []
  } catch {
    return []
  }
}
