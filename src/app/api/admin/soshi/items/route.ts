import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = "https://poooifyqfwlypslbnpep.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb29pZnlxZndseXBzbGJucGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTMyNzEsImV4cCI6MjA5NjQyOTI3MX0.kBrCH810TyVWKikECVgpmGtDV7L9m0O-FZHHudJAmHo"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "korush1404"

const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
}

const TABLE = `${SUPABASE_URL}/rest/v1/soshi_menu_overrides`
const CUSTOM_PREFIX = "custom__"

type OverrideRow = {
  item_id: string
  price: number | null
  available: boolean | null
  name: string | null
  image: string | null
}

function customId(category: string) {
  const safeCategory = category.replace(/[^a-zA-Z0-9_-]/g, "")
  return `${CUSTOM_PREFIX}${safeCategory}__${Date.now()}`
}

function categoryFromId(id: string) {
  const match = id.match(/^custom__(.+)__\d+$/)
  return match?.[1] ?? "sushi"
}

function encodeName(name: string, ingredients: string, deleted = false) {
  return JSON.stringify({ name, ingredients, deleted })
}

function decodeName(value: string | null) {
  if (!value) return { name: "", ingredients: "", deleted: false }

  try {
    const parsed = JSON.parse(value) as { name?: unknown; ingredients?: unknown; deleted?: unknown }
    return {
      name: typeof parsed.name === "string" ? parsed.name : value,
      ingredients: typeof parsed.ingredients === "string" ? parsed.ingredients : "",
      deleted: parsed.deleted === true,
    }
  } catch {
    return { name: value, ingredients: "", deleted: false }
  }
}

export async function GET() {
  const res = await fetch(`${TABLE}?select=item_id,price,available,name,image`, {
    headers,
    cache: "no-store",
  })
  const data = await res.json().catch(() => null)
  if (!Array.isArray(data)) return NextResponse.json([])

  const items = (data as OverrideRow[])
    .filter((row) => row.item_id.startsWith(CUSTOM_PREFIX))
    .filter((row) => !decodeName(row.name).deleted)
    .map((row) => {
      const decoded = decodeName(row.name)
      return {
        id: row.item_id,
        category: categoryFromId(row.item_id),
        name: decoded.name,
        ingredients: decoded.ingredients,
        price: row.price ?? 0,
        available: row.available ?? true,
        image: row.image || undefined,
      }
    })

  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { category, name, ingredients, price } = body
  if (!category || !name || !price) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const id = customId(category)
  const row = {
    item_id: id,
    price: parseInt(String(price), 10),
    available: true,
    name: encodeName(name, ingredients || ""),
    image: null,
  }

  const res = await fetch(TABLE, {
    method: "POST",
    headers: { ...headers, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(row),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: res.status || 500 })
  }

  const data = await res.json().catch(() => null)
  const saved = Array.isArray(data) ? (data[0] as OverrideRow | undefined) : undefined
  const decoded = decodeName(saved?.name ?? row.name)

  return NextResponse.json({
    id,
    category,
    name: decoded.name,
    ingredients: decoded.ingredients,
    price: row.price,
    available: true,
  })
}

export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = body
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const name = String(body.name ?? "")
  const ingredients = String(body.ingredients ?? "")
  const price = Number.isFinite(Number(body.price)) ? Number(body.price) : null
  const image = typeof body.image === "string" ? body.image : null
  const row = {
    item_id: String(id),
    price,
    available: false,
    name: encodeName(name, ingredients, true),
    image,
  }

  const res = await fetch(TABLE, {
    method: "POST",
    headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(row),
  })

  return res.ok
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: await res.text() }, { status: res.status || 500 })
}
