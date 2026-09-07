import type { Metadata } from "next"
import Link from "next/link"
import { PRIVATE_GUIDE_FEATURES } from "@/lib/constants"
import { BadgeSection } from "@/components/shared/BadgeSection"
import { UserCog, CalendarClock, Route, Users2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Guide Khusus Rombongan Kamu | Rimba Awal Expedition",
  description: "Trekking privat TNGGP Situ Gunung dengan guide khusus rombongan kamu. Jadwal fleksibel, pace disesuaikan, privasi terjaga.",
  keywords: ["private guide trekking situ gunung", "trekking privat TNGGP", "guide pribadi hutan sukabumi"],
}

const ICON_MAP = {
  UserCog,
  CalendarClock,
  Route,
  Users2,
}

export default function PrivateGuidePage() {
  return (
    <main className="min-h-screen bg-sand pt-32 pb-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        
        {/* ── Hero Kecil ── */}
        <div className="mb-16 text-center">
          <BadgeSection label="PRIVATE GUIDE" variant="sand" />
          <h1 className="text-h1 mt-4">
            GUIDE KHUSUS <span className="text-gold">ROMBONGAN KAMU</span>
          </h1>
          <p className="text-body mx-auto mt-4 max-w-2xl text-charcoal/70">
            Nikmati kebebasan menjelajah hutan TNGGP tanpa harus terikat dengan jadwal dan kecepatan rombongan lain. Harga mulai dari Rp350K/orang + guide fee.
          </p>
        </div>

        {/* ── Feature Cards ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {PRIVATE_GUIDE_FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon]
            return (
              <div
                key={i}
                className="group rounded-[18px] border border-charcoal/10 bg-white/60 p-6 transition-colors hover:border-gold/30 hover:bg-white"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-charcoal text-gold transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-h4 mb-2">{feature.title}</h3>
                <p className="text-body-sm text-charcoal/70">{feature.desc}</p>
              </div>
            )
          })}
        </div>

        {/* ── Tabel Perbandingan vs Open Trip ── */}
        <div className="mb-20 overflow-hidden rounded-[18px] border border-charcoal/10 bg-white">
          <div className="bg-charcoal px-6 py-5 text-center">
            <h2 className="text-h3 text-gold">Private Trip vs Open Trip</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[15px]">
              <thead>
                <tr className="border-b border-charcoal/10 bg-sand/50">
                  <th className="p-5 font-semibold text-charcoal/70 w-1/4">Fitur</th>
                  <th className="p-5 font-bold text-charcoal w-3/8 text-center border-l border-charcoal/10">Private Trip (Recommended)</th>
                  <th className="p-5 font-semibold text-charcoal/60 w-3/8 text-center border-l border-charcoal/10">Open Trip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                <tr>
                  <td className="p-5 font-semibold text-charcoal/80">Guide</td>
                  <td className="p-5 text-center font-medium text-charcoal border-l border-charcoal/10">Dedicated (Khusus Rombonganmu)</td>
                  <td className="p-5 text-center text-charcoal/60 border-l border-charcoal/10">Dibagi dengan rombongan lain</td>
                </tr>
                <tr className="bg-sand/30">
                  <td className="p-5 font-semibold text-charcoal/80">Jadwal & Pace</td>
                  <td className="p-5 text-center font-medium text-charcoal border-l border-charcoal/10">Sangat Fleksibel</td>
                  <td className="p-5 text-center text-charcoal/60 border-l border-charcoal/10">Fix sesuai jadwal rombongan</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-charcoal/80">Harga</td>
                  <td className="p-5 text-center font-medium text-charcoal border-l border-charcoal/10">Per Orang + Flat Guide Fee</td>
                  <td className="p-5 text-center text-charcoal/60 border-l border-charcoal/10">All-in Per Orang</td>
                </tr>
                <tr className="bg-sand/30">
                  <td className="p-5 font-semibold text-charcoal/80">Cocok Untuk</td>
                  <td className="p-5 text-center font-medium text-charcoal border-l border-charcoal/10">Keluarga, Teman Dekat, Pemula, Lansia</td>
                  <td className="p-5 text-center text-charcoal/60 border-l border-charcoal/10">Solo Traveler, Budget Backpacker</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Testimoni Placeholder ── */}
        <div className="mb-20 text-center">
          <p className="text-body mx-auto max-w-3xl italic text-charcoal/80">
            "Awalnya ragu bawa anak-anak trekking 7KM, tapi karena ambil Private Trip, guide-nya sabar banget nungguin anak-anak istirahat. Nggak ngerasa dikejar waktu sama sekali. The best!"
          </p>
          <p className="mt-4 font-bold text-gold">— Keluarga Bpk. Andi, Jakarta</p>
        </div>

        {/* ── CTA Besar ── */}
        <div className="text-center">
          <Link 
            href="/#booking"
            className="inline-block rounded-full bg-gold px-10 py-5 text-[16px] font-bold text-charcoal transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            Hitung Estimasi Private Trip Sekarang
          </Link>
          <p className="mt-3 text-[13px] text-charcoal/60">Dialihkan ke form kalkulator di Beranda</p>
        </div>

      </div>
    </main>
  )
}
