import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SafetySection } from "@/components/home/SafetySection"
import { ImageIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Panduan Keselamatan | Private Tour Guide Lembah Purba Expedition",
  description: "Persiapan fisik, barang bawaan wajib, dan panduan keselamatan untuk trekking aman di lembah purba.",
  keywords: ["persiapan trekking", "safety trekking", "barang bawaan trekking ekspedisi lembah purba"],
}

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-sandalt pt-32 pb-20">
      {/* ── SEO H1 ── */}
      <h1 className="sr-only">KESELAMATAN & PERSIAPAN TREKKING</h1>

      {/* ── Reuse SafetySection ── */}
      <div className="-mt-16">
        <SafetySection />
      </div>

      {/* ── Flatlay & FAQ Khusus Safety ── */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 mt-10">

        <div className="grid gap-10 md:grid-cols-2 items-center">

          {/* Flatlay Placeholder */}
          <div className="relative group aspect-[4/3] rounded-[18px] bg-charcoal/10 flex flex-col items-center justify-center text-charcoal/40 overflow-hidden">
            <Image
              src="/images/pristine_climbing_harness.webp"
              alt="Pristine Climbing Harness"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* FAQ Safety */}
          <div>
            <h2 className="text-h3 mb-6">Tanya Jawab <span className="text-gold">Keamanan</span></h2>

            <div className="space-y-5">
              <div className="rounded-[14px] bg-white p-5 border border-charcoal/10">
                <h4 className="font-semibold text-charcoal mb-2">Apakah ada asuransi?</h4>
                <p className="text-body-sm text-charcoal/70">
                  Ya, tiket resmi TNGGP sudah mencakup asuransi dasar. Selain itu perlengkapan safety harness kami berstandar internasional.
                </p>
              </div>
              <div className="rounded-[14px] bg-white p-5 border border-charcoal/10">
                <h4 className="font-semibold text-charcoal mb-2">Bagaimana kalau cedera di jalan?</h4>
                <p className="text-body-sm text-charcoal/70">
                  Semua guide kami terlatih dalam P3K dasar. Ada titik evakuasi di area jembatan gantung dan basecamp standby dengan tim medis.
                </p>
              </div>
              <div className="rounded-[14px] bg-white p-5 border border-charcoal/10">
                <h4 className="font-semibold text-charcoal mb-2">Boleh bawa makanan sendiri?</h4>
                <p className="text-body-sm text-charcoal/70">
                  Sangat boleh, kami menyarankan bawa snack berkalori tinggi (cokelat, madu, dsb) untuk menambah tenaga di jalan. Makan siang utama sudah kami sediakan.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ── CTA ── */}
        <div className="mt-20 text-center">
          <Link
            href="/#booking"
            className="inline-block rounded-full bg-gold px-10 py-5 text-[16px] font-bold text-charcoal transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            Booking Tanggal Sekarang
          </Link>
        </div>
      </div>

    </main>
  )
}
