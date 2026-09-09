import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const order_id = searchParams.get("order_id")

    if (!order_id) {
      return NextResponse.json({ error: "Order ID wajib disertakan." }, { status: 400 })
    }

    const supabaseAdmin = getSupabaseAdmin()

    const { data: booking, error: fetchError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("order_id", order_id)
      .single()

    if (fetchError || !booking) {
      return NextResponse.json({ error: "Pesanan tidak ditemukan." }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: booking })
  } catch (error: any) {
    console.error("Fetch Status Error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 })
  }
}
