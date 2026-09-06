// lib/wa.ts
// Utilitas WhatsApp — notifikasi admin setelah pembayaran berhasil
// WA bukan cara bayar, hanya notifikasi/konfirmasi
// TODO: Isi di prompt berikutnya

export function buildWhatsAppUrl(_message: string): string {
  const phone = process.env.NEXT_PUBLIC_WA_ADMIN_NUMBER ?? ''
  return `https://wa.me/${phone}?text=${encodeURIComponent(_message)}`
}
