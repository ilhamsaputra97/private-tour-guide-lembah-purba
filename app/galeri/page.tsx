import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Galeri | Private Tour Guide Lembah Purba Expedition",
  description: "Lihat keseruan dan keindahan alam perjalanan trekking private bersama Private Tour Guide Lembah Purba Expedition.",
}

export default function GaleriPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-sand pt-32 pb-20">
      <div className="text-center px-5">
        <h1 className="font-display text-4xl text-charcoal mb-4">Galeri Perjalanan</h1>
        <p className="text-charcoal/70 mb-8 max-w-md mx-auto">
          Halaman ini sedang dalam tahap pengembangan. Nantikan foto-foto menakjubkan dari perjalanan kami!
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-charcoal px-8 py-4 font-bold text-sand transition-transform hover:scale-[1.03]"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  )
}
