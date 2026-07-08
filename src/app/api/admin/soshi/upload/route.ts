import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = "https://poooifyqfwlypslbnpep.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb29pZnlxZndseXBzbGJucGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTMyNzEsImV4cCI6MjA5NjQyOTI3MX0.kBrCH810TyVWKikECVgpmGtDV7L9m0O-FZHHudJAmHo"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "korush1404"

const BUCKET = "menu-images"

// POST — protected. multipart/form-data: { password, item_id, file }
// Uploads a dish photo to Supabase Storage and returns its public URL.
export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null)
  if (!form) return NextResponse.json({ error: "Bad request" }, { status: 400 })

  const password = form.get("password")
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const itemId = String(form.get("item_id") ?? "").trim()
  const file = form.get("file")
  if (!itemId || !(file instanceof Blob)) {
    return NextResponse.json({ error: "Missing item_id or file" }, { status: 400 })
  }
  if (file.size > 6 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large" }, { status: 413 })
  }

  const type = file.type || "image/webp"
  const ext = type.includes("png") ? "png" : type.includes("jpeg") ? "jpg" : "webp"
  const safeId = itemId.replace(/[^a-zA-Z0-9_-]/g, "")
  const path = `${safeId}-${Date.now()}.${ext}`

  const buf = Buffer.from(await file.arrayBuffer())
  const upRes = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": type,
      "x-upsert": "true",
    },
    body: buf,
  })

  if (!upRes.ok) {
    const err = await upRes.text()
    return NextResponse.json({ error: err }, { status: 500 })
  }

  const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`
  return NextResponse.json({ url })
}
