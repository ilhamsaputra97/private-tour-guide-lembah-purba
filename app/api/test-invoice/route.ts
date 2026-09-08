import { NextResponse } from "next/server"
import { generateAndStoreInvoice } from "@/lib/invoice"

export async function GET() {
  try {
    const dummyBooking = {
      id: "dummy-uuid-" + Date.now(),
      order_id: "RAE-DUMMY-" + Date.now(),
      nama: "John Doe (Dummy)",
      wa_number: "081234567890",
      tanggal_trekking: "2026-12-25",
      jumlah_orang: 4,
      trip_type: "private",
      catatan: "Ini adalah tes invoice dummy",
      total_estimasi: 1550000,
      payment_option: "full",
      amount_to_pay: 1550000,
      payment_status: "settlement",
      midtrans_transaction_id: "trx-dummy",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      invoice_url: null,
      guide_name: "Ilham Saputra"
    }

    const url = await generateAndStoreInvoice(dummyBooking as any)

    // Redirect langsung ke PDF yang baru saja dibuat
    return NextResponse.redirect(url)
  } catch (error: any) {
    console.error("Test Invoice Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
