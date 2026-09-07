import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Tentang Kami | Private Tour Guide Lembah Purba Expedition",
  description: "Mengenal lebih dekat tim Private Tour Guide Lembah Purba Expedition, penyedia layanan private trekking terbaik di Taman Nasional Gunung Gede Pangrango.",
}

export default function TentangPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-sandalt pt-32 pb-20">
      <div className="text-center px-5">
        <h1 className="font-display text-4xl text-charcoal mb-4">Tentang Rimba Awal</h1>
        <p className="text-charcoal/70 mb-8 max-w-md mx-auto">
          Kami berdedikasi untuk memberikan pengalaman trekking privat yang paling eksklusif, aman, dan nyaman di TNGGP.
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-gold px-8 py-4 font-bold text-charcoal transition-transform hover:scale-[1.03]"
        >
          Mulai Petualangan
        </Link>
      </div>
    </main>
  )
}
