import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { RouteSection } from "@/components/home/RouteSection"
import { ImageIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Rute 6KM Pulang Pergi | Private Tour Guide Lembah Purba Expedition",
  description: "Eksplorasi rute trekking 6KM pulang pergi melintasi Suspension Bridge, 8 jembatan gantung ekstrem, susur sungai, hingga Curug Kembar.",
  keywords: ["rute curug kembar", "jalur trekking situ gunung", "peta lembah purba"],
}

export default function RutePage() {
  const images = [
    { src: "/images/jembatan-lembah-purba.jpg", alt: "Jembatan Lembah Purba" },
    { src: "/images/sebelum-jembatan-ki-haji.jpg", alt: "Pemandangan di Jembatan Ki Haji" },
    { src: "/images/sebelum-jembatan-ki-enteh.jpg", alt: "Pemandangan di Jembatan Ki Enteh" },
    { src: "/images/curug kembar.webp", alt: "Curug Kembar" },
    { src: "/images/sesudah-jembatan-batu-tb.jpg", alt: "Pemandangan di Jembatan Batu TB" },
    { src: "/images/curug kembar - plang lembah purba - vanderkhoe.webp", alt: "Vanderkhoe" },
    { src: "/images/curug kembar - plang lembah purba.webp", alt: "Plang Lembah Purba" },
  ]

  return (
    <main className="min-h-screen bg-sand pt-32 pb-20">

      {/* ── SEO H1 (Visually Hidden since RouteSection has its own visual header) ── */}
      <h1 className="sr-only">RUTE 6KM MENUJU CURUG KEMBAR PULANG PERGI</h1>

      {/* ── Reuse RouteSection ── */}
      <div className="-mt-16">
        <RouteSection />
      </div>

      {/* ── Gallery Section ── */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 mt-10">
        <div className="mb-10 text-center">
          <h2 className="text-h3">Galeri Sepanjang <span className="text-gold">Jalur</span></h2>
          <p className="text-body-sm mt-2 text-charcoal/60">
            Beberapa pemandangan yang akan kamu temui.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-[14px] bg-charcoal/10"
            >
              {img.src ? (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-charcoal/30">
                  <ImageIcon className="h-8 w-8 mb-2" />
                  <span className="text-xs font-semibold">{img.alt}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="mt-20 text-center">
          <Link
            href="/#booking"
            className="inline-block rounded-full bg-charcoal px-10 py-5 text-[16px] font-bold text-sand transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            Mulai Petualangan Kamu
          </Link>
        </div>
      </div>

    </main>
  )
}
