import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { sendOTP } from "@/lib/mailer"

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Alamat email wajib diisi." }, { status: 400 })
    }

    const supabaseAdmin = getSupabaseAdmin()

    // 1. Cek apakah nomor ada di tabel bookings
    // Jika perlu, tambahkan filter status = 'success' atau semacamnya
    const { data: bookings, error: checkError } = await supabaseAdmin
      .from("bookings")
      .select("id, email, nama")
      .eq("email", email)

    if (checkError) {
      console.error("Supabase Query Error:", checkError)
      return NextResponse.json({ error: "Gagal mengecek database." }, { status: 500 })
    }

    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan dengan email tersebut. Pastikan email yang dimasukkan sama dengan saat memesan." },
        { status: 404 }
      )
    }

    // 2. Generate OTP (6 digit angka)
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

    // 3. Set waktu kedaluwarsa (10 menit dari sekarang)
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 10)

    // 4. Simpan ke tabel otp_tokens
    const { error: insertError } = await supabaseAdmin
      .from("otp_tokens")
      .insert({
        email: email,
        otp_code: otpCode,
        expires_at: expiresAt.toISOString()
      })

    if (insertError) {
      console.error("Supabase Insert OTP Error:", insertError)
      return NextResponse.json({ error: "Gagal membuat OTP." }, { status: 500 })
    }

    // 5. Kirim pesan Email sungguhan menggunakan Nodemailer
    try {
      await sendOTP(email, otpCode, name)
    } catch (mailErr: any) {
      console.error("Gagal mengirim email, lanjut dengan fallback console log:", mailErr)
      // Fallback jika kredensial belum di-setup tapi db berhasil disimpan
      console.log("=========================================")
      console.log(`[MOCK EMAIL SENDER] MENGIRIM OTP KE: ${email}`)
      console.log(`Pesan: Halo ${name || "Kak"}, kode OTP Cek Pesanan Rimba Awal Anda adalah: ${otpCode}. Berlaku 10 menit.`)
      console.log("=========================================")
    }

    return NextResponse.json({ success: true, message: "OTP berhasil dikirim." })
  } catch (error: any) {
    console.error("Send OTP Error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 })
  }
}
