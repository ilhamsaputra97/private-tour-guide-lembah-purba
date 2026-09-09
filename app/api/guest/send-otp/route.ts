import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { sendOTP } from "@/lib/mailer"
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Alamat email wajib diisi." }, { status: 400 })
    }

    const supabaseAdmin = getSupabaseAdmin()

    const { data: bookings, error: checkError } = await supabaseAdmin
      .from("bookings")
      .select("id, email, nama")
      .eq("email", email)

    if (checkError) {
      console.error("Supabase Query Error:", checkError)
      return NextResponse.json({ error: "Gagal mengecek database." }, { status: 500 })
    }

    // Jika email tidak ditemukan di database reservasi, kembalikan error
    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan dengan email tersebut. Pastikan email yang dimasukkan sama dengan saat memesan." },
        { status: 404 }
      )
    }

    // Kalau ketemu, proses generate + kirim OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 10)

    const otpHash = await bcrypt.hash(otpCode, 10)

    const { error: insertError } = await supabaseAdmin
      .from("otp_tokens")
      .insert({
        email,
        otp_hash: otpHash,
        expires_at: expiresAt.toISOString(),
      })

    if (insertError) {
      console.error("Gagal simpan OTP:", insertError)
      return NextResponse.json({ error: "Terjadi masalah saat membuat OTP. Silakan coba lagi." }, { status: 500 })
    }

    try {
      await sendOTP(email, otpCode, name)
    } catch (mailErr: any) {
      console.error("Gagal mengirim OTP via email:", mailErr)
      return NextResponse.json({ error: "Gagal mengirim email OTP. Pastikan email aktif atau coba beberapa saat lagi." }, { status: 500 })
    }

    // Jika berhasil semua
    return NextResponse.json({
      success: true,
      message: "Kode OTP telah berhasil dikirim ke email Anda.",
    })
  } catch (error: any) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 })
  }
}
