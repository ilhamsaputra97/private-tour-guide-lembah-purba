import { formatRupiah } from "./utils"
import { format } from "date-fns"
import { id } from "date-fns/locale"

export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_ADMIN_NUMBER ?? ""

interface WaLinkParams {
  nama: string
  wa: string
  jumlah: number
  tanggal: string | Date
  paket: string
  total: number
  catatan: string
  invoiceUrl?: string
}

export function buildWaLink(params: WaLinkParams): string {
  const { nama, wa, jumlah, tanggal, paket, total, catatan } = params

  const dateStr = typeof tanggal === "string" 
    ? tanggal 
    : format(tanggal, "EEEE, dd MMMM yyyy", { locale: id })

  const text = `Halo Admin Rimba Awal, saya mau konfirmasi pembayaran booking:

*Nama:* ${nama}
*No WA:* ${wa}
*Tanggal Trekking:* ${dateStr}
*Jumlah:* ${jumlah} Orang
*Paket:* ${paket}
*Total Pembayaran:* ${formatRupiah(total)}
*Catatan Tambahan:* ${catatan}
${params.invoiceUrl ? `\n*Link Invoice:* ${params.invoiceUrl}\n` : ''}
Mohon info selanjutnya ya, Terima kasih!`

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}
