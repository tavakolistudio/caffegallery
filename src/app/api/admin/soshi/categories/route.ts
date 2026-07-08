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
const CATEGORY_PREFIX = "category__"

type CategoryRow = {
  item_id: string
  name: string | null
}

function decodeCategoryName(value: string | null) {
  if (!value) return ""

  try {
    const parsed = JSON.parse(value) as { name?: unknown; kind?: unknown }
    return typeof parsed.name === "string" ? parsed.name : value
  } catch {
    return value
  }
}

export async function GET() {
  const res = await fetch(`${TABLE}?select=item_id,name&item_id=like.${CATEGORY_PREFIX}*`, {
    headers,
    cache: "no-store",
  })
  const data = await res.json().catch(() => null)
  if (!Array.isArray(data)) return NextResponse.json([])

  const categories = (data as CategoryRow[]).map((row) => ({
    id: row.item_id,
    name: decodeCategoryName(row.name),
  }))

  return NextResponse.json(categories)
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const name = String(body.name ?? "").trim()
  if (!name) return NextResponse.json({ error: "Missing name" }, { status: 400 })

  const row = {
    item_id: `${CATEGORY_PREFIX}${Date.now()}`,
    price: null,
    available: true,
    name: JSON.stringify({ kind: "category", name }),
    image: null,
  }

  const res = await fetch(TABLE, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(row),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: res.status || 500 })
  }

  return NextResponse.json({ id: row.item_id, name })
}
