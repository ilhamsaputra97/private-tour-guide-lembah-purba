import { NextRequest, NextResponse } from "next/server"
import { snap } from "@/lib/midtrans"
import { getSupabaseAdmin } from "@/lib/supabase"
import { computeTotal } from "@/lib/pricing"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      nama,
      wa,
      tanggal,
      jumlah,
      tripType,
      nationality,
      dayType,
      catatan,
      paymentOption,
    } = body

    // 1. Hitung ulang total di server (JANGAN percaya input client)
    const totalServer = computeTotal({
      jumlah,
      nationality,
      tripType,
      dayType,
    })

    const orderId = `RAE-${Date.now()}`
    const amountToPay = paymentOption === "dp" ? Math.round(totalServer * 0.3) : totalServer

    // 2. Simpan booking ke Supabase dengan status pending
    const supabaseAdmin = getSupabaseAdmin()
    const { error: insertError } = await supabaseAdmin.from("bookings").insert({
      order_id: orderId,
      nama,
      wa_number: wa,
      tanggal_trekking: tanggal,
      jumlah_orang: jumlah,
      trip_type: tripType,
      nationality,
      day_type: dayType ?? null,
      catatan: catatan ?? null,
      total_estimasi: totalServer,
      payment_option: paymentOption,
      amount_to_pay: amountToPay,
      payment_status: "pending",
    })

    if (insertError) {
      console.error("Supabase Insert Error:", insertError)
      return NextResponse.json({ error: "Gagal menyimpan data booking." }, { status: 500 })
    }

    // 3. Generate Snap Token
    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: amountToPay,
      },
      customer_details: {
        first_name: nama,
        phone: wa,
      },
      item_details: [
        {
          id: tripType,
          price: amountToPay,
          quantity: 1,
          name: `${tripType === "private" ? "Private" : "Open"} Trip - ${jumlah} orang (${paymentOption === "dp" ? "DP 30%" : "Lunas"})`,
        },
      ],
    })

    return NextResponse.json({ snapToken: transaction.token, orderId })
  } catch (error: any) {
    console.error("Create Transaction Error:", error)
    return NextResponse.json({ error: error.message || "Terjadi kesalahan server." }, { status: 500 })
  }
}
