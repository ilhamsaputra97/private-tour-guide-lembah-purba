import { NextRequest, NextResponse } from "next/server"
import { coreApi } from "@/lib/midtrans"
import { getSupabaseAdmin } from "@/lib/supabase"
import { buildWaLink } from "@/lib/wa"
import { generateAndStoreInvoice } from "@/lib/invoice"

export async function POST(req: NextRequest) {
  try {
    const notification = await req.json()

    // Verifikasi status asli ke Midtrans
    const statusResponse = await coreApi.transaction.notification(notification)
    const { order_id, transaction_status, fraud_status, transaction_id } = statusResponse

    let paymentStatus: "pending" | "settlement" | "expire" | "cancel" | "deny" = "pending"

    if (transaction_status === "capture" && fraud_status === "accept") {
      paymentStatus = "settlement"
    } else if (transaction_status === "settlement") {
      paymentStatus = "settlement"
    } else if (transaction_status === "expire") {
      paymentStatus = "expire"
    } else if (transaction_status === "cancel" || transaction_status === "deny") {
      paymentStatus = "deny"
    }

    const supabaseAdmin = getSupabaseAdmin()

    let invoiceUrl: string | undefined = undefined

    if (paymentStatus === "settlement") {
      const { data: existingBooking } = await supabaseAdmin
        .from("bookings")
        .select("*")
        .eq("order_id", order_id)
        .single()

      if (existingBooking) {
        try {
          invoiceUrl = await generateAndStoreInvoice(existingBooking)
        } catch (err) {
          console.error("Failed to generate invoice:", err)
        }
      }
    }

    // Update status di Supabase
    const { data: booking, error: updateError } = await supabaseAdmin
      .from("bookings")
      .update({
        payment_status: paymentStatus,
        midtrans_transaction_id: transaction_id,
        ...(invoiceUrl ? { invoice_url: invoiceUrl } : {}),
        updated_at: new Date().toISOString()
      })
      .eq("order_id", order_id)
      .select()
      .single()

    if (updateError) {
      console.error("Supabase Update Error:", updateError)
      return NextResponse.json({ error: "Gagal update status booking." }, { status: 500 })
    }

    // Simulasi notifikasi admin WA jika sukses
    if (paymentStatus === "settlement" && booking) {

      const waLink = buildWaLink({
        nama: booking.nama,
        wa: booking.wa_number,
        jumlah: booking.jumlah_orang,
        tanggal: booking.tanggal_trekking,
        paket: booking.trip_type === "private" ? "Private Trip" : "Open Trip",
        total: booking.total_estimasi,
        catatan: `${booking.catatan ?? "-"} | Status Bayar: LUNAS/DP (${booking.payment_option})`,
        invoiceUrl
      })
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    return NextResponse.json({ error: "Terjadi kesalahan webhook." }, { status: 500 })
  }
}
