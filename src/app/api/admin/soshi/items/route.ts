import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = "https://poooifyqfwlypslbnpep.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb29pZnlxZndseXBzbGJucGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTMyNzEsImV4cCI6MjA5NjQyOTI3MX0.kBrCH810TyVWKikECVgpmGtDV7L9m0O-FZHHudJAmHo"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "korush1404"

const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
}

// GET — fetch custom items
export async function GET() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/soshi_menu_items?select=*&order=created_at.desc`,
    { headers, cache: "no-store" }
  )
  const data = await res.json().catch(() => null)
  return NextResponse.json(Array.isArray(data) ? data : [])
}

// POST — add new item (protected)
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { category, name, ingredients, price } = body
  if (!category || !name || !price) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/soshi_menu_items`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify({
      id: `custom-${Date.now()}`,
      category,
      name,
      ingredients: ingredients || "",
      price: parseInt(String(price), 10),
      available: true,
      created_at: new Date().toISOString(),
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: res.status || 500 })
  }

  const data = await res.json()
  return NextResponse.json(data[0] ?? { ok: true })
}

// DELETE — remove custom item
export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = body
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const res = await fetch(`${SUPABASE_URL}/rest/v1/soshi_menu_items?id=eq.${id}`, {
    method: "DELETE",
    headers,
  })

  return res.ok
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: "Delete failed" }, { status: 500 })
}
