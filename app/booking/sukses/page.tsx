import { createClient } from "@supabase/supabase-js"
import { PaymentStatusBadge, type PaymentStatus } from "@/components/payment/PaymentStatusBadge"
import { formatRupiah } from "@/lib/utils"
import { buildWaLink } from "@/lib/wa"
import Link from "next/link"
import { CheckCircle2, XCircle, Clock } from "lucide-react"

export const metadata = {
  title: "Status Booking | Lembah Purba Expedition",
}

export default async function BookingSuksesPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const orderId = resolvedSearchParams.order_id

  if (!orderId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-sand px-5">
        <div className="text-center">
          <h1 className="mb-4 font-display text-3xl text-charcoal">Booking Tidak Ditemukan</h1>
          <p className="mb-8 text-charcoal/70">Tidak ada ID pesanan yang diberikan.</p>
          <Link href="/" className="rounded-full bg-gold px-8 py-3 font-semibold text-charcoal">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    )
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("order_id", orderId)
    .single()

  if (!booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-sand px-5">
        <div className="text-center">
          <h1 className="mb-4 font-display text-3xl text-charcoal">Booking Tidak Ditemukan</h1>
          <p className="mb-8 text-charcoal/70">Pesanan dengan ID {orderId} tidak ada di sistem kami.</p>
          <Link href="/" className="rounded-full bg-gold px-8 py-3 font-semibold text-charcoal">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    )
  }

  const status = booking.payment_status as PaymentStatus

  const waLink = buildWaLink({
    nama: booking.nama,
    wa: booking.wa_number,
    jumlah: booking.jumlah_orang,
    tanggal: booking.tanggal_trekking,
    paket: booking.trip_type === "private" ? "Private Trip" : "Open Trip",
    total: booking.total_estimasi,
    catatan: `${booking.catatan ?? "-"} | Status Bayar: ${status === "settlement" ? "LUNAS/DP DITERIMA" : status.toUpperCase()}`,
  })

  return (
    <main className="min-h-screen bg-sandalt py-24 md:py-32">
      <div className="mx-auto max-w-[600px] px-5">
        <div className="rounded-[24px] bg-white p-8 text-center shadow-sm md:p-12">

          <div className="mb-6 flex justify-center">
            {status === "settlement" && <CheckCircle2 className="h-20 w-20 text-green-500" strokeWidth={1.5} />}
            {status === "pending" && <Clock className="h-20 w-20 text-amber-500" strokeWidth={1.5} />}
            {(status === "expire" || status === "cancel" || status === "deny") && (
              <XCircle className="h-20 w-20 text-red-500" strokeWidth={1.5} />
            )}
          </div>

          <h1 className="mb-2 font-display text-3xl text-charcoal md:text-4xl">
            {status === "settlement" ? "Pembayaran Berhasil!" :
              status === "pending" ? "Menunggu Pembayaran" :
                "Pembayaran Gagal"}
          </h1>

          <p className="mb-6 text-[15px] text-charcoal/70">
            Order ID: <span className="font-mono font-bold text-charcoal">{orderId}</span>
          </p>

          <div className="mb-8 flex justify-center">
            <PaymentStatusBadge status={status} />
          </div>

          <div className="mb-8 rounded-[16px] border border-charcoal/10 bg-sand/50 p-6 text-left">
            <h3 className="mb-4 font-bold text-charcoal">Ringkasan Pesanan</h3>
            <div className="flex flex-col gap-3 text-[14px]">
              <div className="flex justify-between border-b border-charcoal/5 pb-2">
                <span className="text-charcoal/60">Nama</span>
                <span className="font-semibold text-charcoal">{booking.nama}</span>
              </div>
              <div className="flex justify-between border-b border-charcoal/5 pb-2">
                <span className="text-charcoal/60">Paket</span>
                <span className="font-semibold capitalize text-charcoal">{booking.trip_type} Trip</span>
              </div>
              <div className="flex justify-between border-b border-charcoal/5 pb-2">
                <span className="text-charcoal/60">Peserta</span>
                <span className="font-semibold text-charcoal">{booking.jumlah_orang} Orang</span>
              </div>
              <div className="flex justify-between border-b border-charcoal/5 pb-2">
                <span className="text-charcoal/60">Opsi Bayar</span>
                <span className="font-semibold uppercase text-charcoal">{booking.payment_option}</span>
              </div>
              <div className="flex justify-between pt-2 text-[16px]">
                <span className="font-bold text-charcoal">Nominal Dibayar</span>
                <span className="font-bold text-gold">{formatRupiah(booking.amount_to_pay)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {status === 'settlement' && booking.invoice_url && (
              <a
                href={booking.invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="w-full rounded-full bg-charcoal py-4 font-semibold text-sand transition-transform hover:scale-[1.02] active:scale-[0.98] inline-block text-center"
              >
                Unduh Invoice (PDF)
              </a>
            )}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-gold py-4 font-semibold text-charcoal transition-transform hover:scale-[1.02] active:scale-[0.98] inline-block text-center"
            >
              Chat Admin untuk Konfirmasi
            </a>
            <Link
              href="/"
              className="w-full rounded-full border border-charcoal/20 py-4 font-semibold text-charcoal transition-colors hover:bg-charcoal/5 inline-block text-center"
            >
              Kembali ke Beranda
            </Link>
          </div>

        </div>
      </div>
    </main>
  )
}
