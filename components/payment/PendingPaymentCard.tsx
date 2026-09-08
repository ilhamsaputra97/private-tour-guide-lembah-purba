"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabase-browser"
import { PaymentStatusBadge, type PaymentStatus } from "@/components/payment/PaymentStatusBadge"
import { formatRupiah } from "@/lib/utils"
import { buildWaLink } from "@/lib/wa"
import { Clock, XCircle } from "lucide-react"

export function PendingPaymentCard({
  orderId,
  onResolved,
}: {
  orderId: string
  onResolved: () => void
}) {
  const router = useRouter()
  const [booking, setBooking] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function fetchStatus() {
    const { data } = await supabaseBrowser
      .from("bookings")
      .select("*")
      .eq("order_id", orderId)
      .single()

    if (!data) return
    setBooking(data)
    setIsLoading(false)

    if (data.payment_status === "settlement") {
      localStorage.removeItem("rae_pending_order_id")
      onResolved()
      router.push(`/booking/sukses?order_id=${orderId}`)
    }
  }

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(() => {
      if (booking?.payment_status === "pending" || !booking) {
        fetchStatus()
      }
    }, 8000)
    return () => clearInterval(interval)
  }, [booking?.payment_status, orderId])

  function handleNewBooking() {
    localStorage.removeItem("rae_pending_order_id")
    onResolved()
  }

  if (isLoading || !booking) {
    return (
      <div className="flex w-full items-center justify-center rounded-[24px] bg-white p-8 text-center shadow-sm md:p-12">
        <Clock className="h-10 w-10 animate-spin text-charcoal/20" />
      </div>
    )
  }

  const status = booking.payment_status as PaymentStatus
  const isFailed = ["expire", "cancel", "deny"].includes(status)

  const waLink = buildWaLink({
    nama: booking.nama,
    wa: booking.wa_number,
    jumlah: booking.jumlah_orang,
    tanggal: booking.tanggal_trekking,
    paket: booking.trip_type === "private" ? "Private Trip" : "Open Trip",
    total: booking.total_estimasi,
    catatan: `${booking.catatan ?? "-"} | Status Bayar: ${status.toUpperCase()}`,
  })

  return (
    <div className="w-full max-w-[600px] mx-auto rounded-[24px] bg-white p-8 text-center shadow-sm md:p-12">
      <div className="mb-6 flex justify-center">
        {status === "pending" && <Clock className="h-20 w-20 text-amber-500" strokeWidth={1.5} />}
        {isFailed && <XCircle className="h-20 w-20 text-red-500" strokeWidth={1.5} />}
      </div>

      <h1 className="mb-2 font-display text-3xl text-charcoal md:text-4xl">
        {status === "pending" ? "Menunggu Pembayaran" : "Pembayaran Gagal"}
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
        {status === "pending" && (
          <button
            onClick={fetchStatus}
            className="w-full rounded-full border border-charcoal/20 py-4 font-semibold text-charcoal transition-colors hover:bg-charcoal/5"
          >
            Cek Status Sekarang
          </button>
        )}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-full bg-gold py-4 font-semibold text-charcoal transition-transform hover:scale-[1.02] active:scale-[0.98] inline-block text-center"
        >
          Chat Admin
        </a>
        {isFailed && (
          <button
            onClick={handleNewBooking}
            className="w-full rounded-full bg-charcoal py-4 font-semibold text-sand transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Buat Booking Baru
          </button>
        )}
      </div>
    </div>
  )
}
