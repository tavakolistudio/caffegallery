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

const TABLE = `${SUPABASE_URL}/rest/v1/soshi_menu_overrides`
const SELECT = "item_id,price,available,name,image"

type Override = {
  item_id: string
  price?: number | null
  available?: boolean | null
  name?: string | null
  ingredients?: string | null
  image?: string | null
}

function decodeText(value: string | null | undefined) {
  if (!value) return { name: "", ingredients: "" }

  try {
    const parsed = JSON.parse(value) as { name?: unknown; ingredients?: unknown }
    return {
      name: typeof parsed.name === "string" ? parsed.name : value,
      ingredients: typeof parsed.ingredients === "string" ? parsed.ingredients : "",
    }
  } catch {
    return { name: value, ingredients: "" }
  }
}

function encodeText(name: string, ingredients: string) {
  return JSON.stringify({ name, ingredients })
}

// GET — public, returns {item_id, price, available, name, image}[]
export async function GET() {
  const res = await fetch(`${TABLE}?select=${SELECT}`, { headers, cache: "no-store" })
  const data = await res.json().catch(() => null)
  // Always return an array so clients can safely iterate.
  return NextResponse.json(Array.isArray(data) ? data : [])
}

// POST — protected, body: {password, updates: [{item_id, price?, available?, name?, image?}]}
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const updates: Override[] = (body.updates ?? []).filter((u: Override) => u && u.item_id)
  if (!updates.length) return NextResponse.json({ ok: true })

  // Fetch existing rows so every column is present in the upsert payload.
  // (PostgREST bulk-upsert nulls out any column missing from an object, so we
  //  always send the full merged row to avoid clobbering unrelated fields.)
  const ids = [...new Set(updates.map((u) => u.item_id))]
  const inList = ids.map((id) => `"${id.replace(/"/g, '""')}"`).join(",")
  const existingRes = await fetch(`${TABLE}?select=${SELECT}&item_id=in.(${inList})`, {
    headers,
    cache: "no-store",
  })
  const existing: Override[] = existingRes.ok ? await existingRes.json() : []
  const existingMap = new Map(existing.map((r) => [r.item_id, r]))

  const rows = updates.map((u) => {
    const prev: Override = existingMap.get(u.item_id) ?? { item_id: u.item_id }
    const prevText = decodeText(prev.name)
    const textChanged = "name" in u || "ingredients" in u
    return {
      item_id: u.item_id,
      price: "price" in u ? u.price : prev.price ?? null,
      available: "available" in u ? u.available : prev.available ?? null,
      name: textChanged
        ? encodeText(
            ("name" in u ? u.name : prevText.name) ?? "",
            ("ingredients" in u ? u.ingredients : prevText.ingredients) ?? ""
          )
        : prev.name ?? null,
      image: "image" in u ? u.image : prev.image ?? null,
    }
  })

  const res = await fetch(TABLE, {
    method: "POST",
    headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(rows),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
