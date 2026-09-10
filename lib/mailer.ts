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
    from: `"Private Tour Guide Lembah Purba Expedition" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Kode OTP Cek Pesanan Anda: ${otpCode}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="color: #262c2e; margin-bottom: 20px;">Halo, ${userName || "Tamu"}!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
          Anda menerima email ini karena ada permintaan untuk mengecek status pesanan perjalanan di <strong>Lembah Purba Expedition</strong> yang terhubung dengan email ini.
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
          &copy; ${new Date().getFullYear()} Private Tour Guide Lembah Purba Expedition
        </p>
      </div>
    `,
  }

  // Kirim email
  try {
    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    throw error
  }
}

/**
 * Mengirimkan email Bukti Pembayaran / Invoice ke pengguna
 */
export async function sendInvoiceEmail(toEmail: string, userName: string, orderId: string, invoiceUrl: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.warn("Kredensial email belum diatur, skip kirim email invoice.")
    return
  }

  const mailOptions = {
    from: `"Private Tour Guide Lembah Purba Expedition" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `✅ Pembayaran Berhasil - Invoice Pesanan ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="color: #262c2e; margin-bottom: 20px;">Halo, ${userName || "Tamu"}!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
          Terima kasih! Pembayaran Anda untuk pesanan dengan Order ID <strong>${orderId}</strong> telah berhasil kami terima.
        </p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
          Anda dapat mengunduh invoice (bukti pembayaran) dan tiket Anda melalui tautan di bawah ini:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${invoiceUrl}" target="_blank" style="background-color: #b48530; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
            Download Invoice & Tiket
          </a>
        </div>
        <p style="color: #4b5563; font-size: 14px;">
          Jika tombol di atas tidak berfungsi, salin dan tempel tautan berikut di browser Anda:<br>
          <a href="${invoiceUrl}" style="color: #b48530;">${invoiceUrl}</a>
        </p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5; margin-top: 30px;">
          Harap simpan invoice ini dan tunjukkan kepada Tour Guide (Kang Ilham) pada hari H keberangkatan Anda. Jika ada pertanyaan, jangan ragu untuk menghubungi admin kami via WhatsApp.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          Email ini dikirim secara otomatis. Harap tidak membalas email ini.<br>
          &copy; ${new Date().getFullYear()} Private Tour Guide Lembah Purba Expedition
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error("Gagal mengirim email invoice:", error)
  }
}
