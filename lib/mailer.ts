import nodemailer from "nodemailer"

// Inisialisasi transporter Nodemailer
// Kita menggunakan SMTP Gmail sebagai contoh yang mudah.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
})

/**
 * Mengirimkan email OTP ke pengguna
 */
export async function sendOTP(toEmail: string, otpCode: string, userName: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error("Kredensial email (EMAIL_USER & EMAIL_APP_PASSWORD) belum diatur di file .env.local")
  }

  const mailOptions = {
    from: `"Rimba Awal Expedition" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Kode OTP Cek Pesanan Anda: ${otpCode}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="color: #262c2e; margin-bottom: 20px;">Halo, ${userName || "Tamu"}!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
          Anda menerima email ini karena ada permintaan untuk mengecek status pesanan perjalanan di <strong>Rimba Awal Expedition</strong> yang terhubung dengan email ini.
        </p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
          Berikut adalah kode OTP rahasia Anda:
        </p>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #b48530;">${otpCode}</span>
        </div>
        <p style="color: #ef4444; font-size: 14px;">
          *Kode ini hanya berlaku selama 10 menit. Jangan berikan kode ini kepada siapa pun.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          Email ini dibuat secara otomatis. Harap tidak membalas email ini.<br>
          &copy; ${new Date().getFullYear()} Rimba Awal Expedition
        </p>
      </div>
    `,
  }

  // Kirim email
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log(`[Nodemailer] Email berhasil terkirim ke: ${toEmail}. Message ID: ${info.messageId}`)
    return info
  } catch (error) {
    console.error("[Nodemailer] Gagal mengirim email:", error)
    throw error
  }
}
