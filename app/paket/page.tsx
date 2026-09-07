import type { Metadata } from "next"
import Link from "next/link"
import { BadgeSection } from "@/components/shared/BadgeSection"
import { PRIVATE_PACKAGE, OPEN_PACKAGE } from "@/lib/constants"
import { PackageCard } from "@/components/shared/PackageCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Private Trip atau Open Trip? | Rimba Awal Expedition",
  description: "Bandingkan paket trekking TNGGP Situ Gunung. Pilih Private Trip untuk privasi & fleksibilitas, atau Open Trip untuk paket hemat all-in.",
}

export default function PaketPage() {
  return (
    <main className="min-h-screen bg-sandalt pt-32 pb-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        
        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <BadgeSection label="PILIHAN PAKET" variant="sand" />
          <h1 className="text-h1 mt-4">
            PRIVATE TRIP ATAU <span className="text-gold">OPEN TRIP?</span>
          </h1>
          <p className="text-body mx-auto mt-4 max-w-2xl text-charcoal/70">
            Pilih perjalanan yang paling pas buat gaya dan budget kamu. Mau eksklusif atau hemat? Keduanya tetap dapat experience terbaik.
          </p>
        </div>

        {/* ── Tabs ── */}
        <Tabs defaultValue="private" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-white border border-charcoal/10 rounded-full h-auto p-1.5">
              <TabsTrigger 
                value="private" 
                className="rounded-full px-6 py-2.5 text-[15px] font-semibold data-[state=active]:bg-charcoal data-[state=active]:text-sand"
              >
                Private Trip
              </TabsTrigger>
              <TabsTrigger 
                value="open"
                className="rounded-full px-6 py-2.5 text-[15px] font-semibold data-[state=active]:bg-charcoal data-[state=active]:text-sand"
              >
                Open Trip
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB PRIVATE */}
          <TabsContent value="private" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mx-auto max-w-lg mb-16">
              <PackageCard {...PRIVATE_PACKAGE} />
            </div>

            <div className="grid gap-10 md:grid-cols-2 mt-16 max-w-4xl mx-auto">
              <div className="bg-white rounded-[18px] border border-charcoal/10 p-6 md:p-8">
                <h3 className="text-h4 mb-4 text-gold">Kebijakan Fleksibel Private Trip</h3>
                <ul className="space-y-3 text-body-sm text-charcoal/70">
                  <li><strong className="text-charcoal">Reschedule:</strong> Bebas pindah tanggal max H-3 sebelum keberangkatan (tanpa charge).</li>
                  <li><strong className="text-charcoal">Refund:</strong> 100% (potong biaya admin) jika batal max H-7. 50% jika batal H-6 s/d H-3.</li>
                  <li><strong className="text-charcoal">Penyesuaian Peserta:</strong> Bisa nambah/kurang orang sampai H-1 (biaya disesuaikan ulang).</li>
                </ul>
              </div>
              <div className="bg-white rounded-[18px] border border-charcoal/10 p-6 md:p-8">
                <h3 className="text-h4 mb-4">FAQ Private Trip</h3>
                <div className="space-y-4 text-body-sm text-charcoal/70">
                  <div>
                    <strong className="block text-charcoal mb-1">Apakah pasti berangkat walau 1 orang?</strong>
                    Pasti. Private Trip tidak ada kuota minimal keberangkatan rombongan gabungan.
                  </div>
                  <div>
                    <strong className="block text-charcoal mb-1">Tiket WNA gimana?</strong>
                    Jika ada WNA, tiket akan menyesuaikan tarif turis mancanegara (lihat rincian kalkulator).
                  </div>
                  <div>
                    <strong className="block text-charcoal mb-1">Boleh bawa anjing/hewan peliharaan?</strong>
                    TNGGP melarang membawa hewan peliharaan demi ekosistem satwa liar di dalam kawasan.
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB OPEN */}
          <TabsContent value="open" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mx-auto max-w-lg mb-16">
              <PackageCard {...OPEN_PACKAGE} />
            </div>

            <div className="grid gap-10 md:grid-cols-2 mt-16 max-w-4xl mx-auto">
              <div className="bg-white rounded-[18px] border border-charcoal/10 p-6 md:p-8">
                <h3 className="text-h4 mb-4 text-charcoal">Ketentuan Open Trip</h3>
                <ul className="space-y-3 text-body-sm text-charcoal/70">
                  <li><strong className="text-charcoal">Reschedule:</strong> Hanya bisa max H-7. Kurang dari itu hangus / tidak bisa diubah.</li>
                  <li><strong className="text-charcoal">Refund:</strong> Batal max H-7 dikembalikan 50%. Lewat dari itu DP/Lunas hangus.</li>
                  <li><strong className="text-charcoal">Kuota & Jadwal:</strong> Mengikuti jadwal fix dari kami. Kecepatan jalan (pace) mengikuti rombongan besar.</li>
                </ul>
              </div>
              <div className="bg-white rounded-[18px] border border-charcoal/10 p-6 md:p-8">
                <h3 className="text-h4 mb-4">FAQ Open Trip</h3>
                <div className="space-y-4 text-body-sm text-charcoal/70">
                  <div>
                    <strong className="block text-charcoal mb-1">Berapa kuota 1 grup Open Trip?</strong>
                    Biasanya 10-15 orang dengan 1-2 local guide pendamping.
                  </div>
                  <div>
                    <strong className="block text-charcoal mb-1">Kalau kuota nggak penuh?</strong>
                    Tetap jalan sesuai janji. Kami tidak main cancel dadakan karena kuota.
                  </div>
                  <div>
                    <strong className="block text-charcoal mb-1">Cocok bawa orang tua?</strong>
                    Kurang disarankan karena harus mengimbangi pace jalan peserta lain (mayoritas anak muda).
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* ── CTA Besar ── */}
        <div className="mt-20 text-center">
          <Link 
            href="/#booking"
            className="inline-block rounded-full bg-charcoal px-10 py-5 text-[16px] font-bold text-sand transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            Pesan Trip Kamu Sekarang
          </Link>
        </div>

      </div>
    </main>
  )
}
