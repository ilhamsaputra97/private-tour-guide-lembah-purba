import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json()

    if (!orderId) {
      return NextResponse.json({ error: "Order ID diperlukan" }, { status: 400 })
    }

    const supabaseAdmin = getSupabaseAdmin()

    // Hapus pesanan yang ditinggalkan (abandoned) dari database
    const { error } = await supabaseAdmin
      .from("bookings")
      .delete()
      .eq("order_id", orderId)
      .eq("payment_status", "pending") // Pastikan hanya menghapus yang masih pending

    if (error) {
      console.error("Gagal menghapus abandoned booking:", error)
      return NextResponse.json({ error: "Gagal menghapus pesanan" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Cancel Abandoned Error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
