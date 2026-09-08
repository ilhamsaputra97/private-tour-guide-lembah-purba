import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Alamat email dan kode OTP wajib diisi." }, { status: 400 })
    }

    const supabaseAdmin = getSupabaseAdmin()

    // 1. Validasi OTP di tabel otp_tokens
    const { data: tokens, error: checkError } = await supabaseAdmin
      .from("otp_tokens")
      .select("*")
      .eq("email", email)
      .eq("otp_code", otp)

    if (checkError) {
      console.error("Supabase Query Error:", checkError)
      return NextResponse.json({ error: "Gagal memverifikasi OTP." }, { status: 500 })
    }

    // Jika tidak ada token cocok
    if (!tokens || tokens.length === 0) {
      return NextResponse.json({ error: "Kode OTP salah." }, { status: 400 })
    }

    // Cek kedaluwarsa
    const token = tokens[0] // Asumsi ambil yang pertama ketemu
    if (new Date(token.expires_at) < new Date()) {
      return NextResponse.json({ error: "Kode OTP sudah kedaluwarsa." }, { status: 400 })
    }

    // 2. Jika valid, hapus token agar tidak bisa dipakai 2x
    await supabaseAdmin
      .from("otp_tokens")
      .delete()
      .eq("id", token.id)

    // 3. Ambil data asli pemesanan dari tabel bookings
    // Diurutkan descending jika ada lebih dari 1 pesanan (ambil yang terbaru)
    const { data: bookings, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("email", email)
      .order("id", { ascending: false })
      .limit(1)

    if (bookingError || !bookings || bookings.length === 0) {
      console.error("Fetch Booking Error:", bookingError)
      return NextResponse.json({ error: "Gagal mengambil detail pesanan." }, { status: 500 })
    }

    const bookingData = bookings[0]

    // 4. Kembalikan data ke client
    return NextResponse.json({ success: true, data: bookingData })
  } catch (error: any) {
    console.error("Verify OTP Error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 })
  }
}
