"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { ButtonRA } from "@/components/shared/ButtonRA"

function StatusContent() {
  const [bookingData, setBookingData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = sessionStorage.getItem("guest_booking_data")
    if (data) {
      try {
        setBookingData(JSON.parse(data))
      } catch (e) {
        console.error("Failed to parse booking data", e)
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="text-center pt-32">Memuat data pesanan...</div>
  }

  if (!bookingData) {
    return (
      <div className="mx-auto max-w-[800px] px-5 pt-32 text-center">
        <h1 className="font-display text-[32px] text-charcoal">Sesi Telah Berakhir</h1>
        <p className="mt-3 text-charcoal/70">Data pesanan tidak ditemukan atau sesi Anda telah kedaluwarsa. Silakan lakukan pengecekan ulang dari beranda.</p>
        <div className="mt-8">
          <Link href="/">
            <ButtonRA variant="primary">Kembali ke Beranda</ButtonRA>
          </Link>
        </div>
      </div>
    )
  }

  const {
    nama,
    email,
    order_id,
    tanggal_trekking,
    jumlah_orang,
    trip_type,
    total_estimasi,
    payment_status
  } = bookingData

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka)
  }

  return (
    <div className="mx-auto max-w-[800px] px-5 pb-32 pt-28 md:px-8 md:pb-28">
      <div className="text-center">
        <h1 className="font-display text-[32px] leading-tight text-charcoal md:text-[42px]">
          Halo <span className="text-gold">{nama}</span>,
        </h1>
        <p className="mt-3 text-[16px] text-charcoal/70">
          Berikut adalah detail pesanan terakhir yang terhubung dengan email {email}.
        </p>
      </div>

      <div className="mt-10 rounded-[18px] border border-charcoal/10 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.03)] md:p-10">
        <div className="mb-6 flex items-center justify-between border-b border-charcoal/10 pb-6">
          <div>
            <p className="text-xs font-semibold tracking-wider text-charcoal/50 uppercase">Order ID</p>
            <p className="font-mono text-lg font-medium text-charcoal mt-1">{order_id}</p>
          </div>
          <div className="text-right">
            {payment_status === "settlement" || payment_status === "capture" ? (
              <span className="inline-block rounded-full bg-emerald-600/10 px-3 py-1 text-xs sm:text-sm font-medium text-emerald-700 border border-emerald-600/20">
                Lunas (Settlement)
              </span>
            ) : payment_status === "pending" ? (
              <span className="inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs sm:text-sm font-medium text-amber-700 border border-amber-500/20">
                Menunggu Pembayaran
              </span>
            ) : (
              <span className="inline-block rounded-full bg-red-500/10 px-3 py-1 text-xs sm:text-sm font-medium text-red-700 border border-red-500/20">
                {payment_status || "Batal / Kedaluwarsa"}
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-wider text-charcoal/50 uppercase">Paket Trip</p>
            <p className="text-charcoal mt-1 font-medium capitalize">{trip_type} Trip</p>
            <p className="text-sm text-charcoal/70">Lembah Purba, Situgunung</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-charcoal/50 uppercase">Jadwal Keberangkatan</p>
            <p className="text-charcoal mt-1 font-medium">{tanggal_trekking}</p>
            <p className="text-sm text-charcoal/70">Tour Guide sudah Ready di Titik Kumpul dari jam 07:00 WIB</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-charcoal/50 uppercase">Jumlah Rombongan</p>
            <p className="text-charcoal mt-1 font-medium">{jumlah_orang} Orang</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-charcoal/50 uppercase">Total Estimasi</p>
            <p className="font-mono text-lg font-bold text-charcoal mt-1">{formatRupiah(total_estimasi)}</p>
          </div>
        </div>

        <div className="rounded-xl bg-sand p-5 text-sm text-charcoal/80 border border-charcoal/5">
          <p className="font-semibold text-charcoal flex items-center gap-2">
            <span>📝</span> Catatan Guide:
          </p>
          <p className="mt-2 leading-relaxed">
            "Terima kasih sudah memesan! Guide Anda (Ilham Saputra) akan menghubungi nomor WhatsApp Anda H-1 sebelum keberangkatan untuk briefing perlengkapan. Jika ada pantangan makanan untuk tim Anda, silakan hubungi kami."
          </p>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/">
          <ButtonRA variant="secondary">
            Kembali ke Beranda
          </ButtonRA>
        </Link>
      </div>
    </div>
  )
}

export default function StatusPesananPage() {
  return (
    <main className="min-h-screen bg-sandalt">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-charcoal">Memuat detail pesanan...</div>}>
        <StatusContent />
      </Suspense>
    </main>
  )
}
