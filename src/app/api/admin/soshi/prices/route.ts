import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = "https://poooifyqfwlypslbnpep.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb29pZnlxZndseXBzbGJucGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTMyNzEsImV4cCI6MjA5NjQyOTI3MX0.kBrCH810TyVWKikECVgpmGtDV7L9m0O-FZHHudJAmHo"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "korush1404"

const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
}

// GET — public, returns {item_id, price, available}[]
export async function GET() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/soshi_menu_overrides?select=item_id,price,available`,
    { headers, cache: "no-store" }
  )
  const data = await res.json()
  return NextResponse.json(data)
}

// POST — protected, body: {password, updates: [{item_id, price?, available?}]}
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const updates: { item_id: string; price?: number; available?: boolean }[] = body.updates ?? []
  if (!updates.length) return NextResponse.json({ ok: true })

  const res = await fetch(`${SUPABASE_URL}/rest/v1/soshi_menu_overrides`, {
    method: "POST",
    headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(updates),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
