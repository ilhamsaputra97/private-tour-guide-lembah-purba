"use client"

import { TripTypeToggle } from "@/components/shared/TripTypeToggle"
import { NationalitySelector } from "@/components/shared/NationalitySelector"
import { DayTypeSelector } from "@/components/shared/DayTypeSelector"
import { formatRupiah } from "@/lib/utils"
import { computeTotal, getBasePricePerOrang, PRICE } from "@/lib/pricing"
import { AlertTriangle, Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface CostCalculatorProps {
  jumlah: number
  onJumlahChange: (val: number) => void
  tripType: "private" | "open"
  onTripTypeChange: (val: "private" | "open") => void
  nationality: "wni" | "wna"
  onNationalityChange: (val: "wni" | "wna") => void
  dayType: "weekday" | "weekend"
  onDayTypeChange: (val: "weekday" | "weekend") => void
  onScrollToForm: () => void
}

export function CostCalculator({
  jumlah,
  onJumlahChange,
  tripType,
  onTripTypeChange,
  nationality,
  onNationalityChange,
  dayType,
  onDayTypeChange,
  onScrollToForm,
}: CostCalculatorProps) {
  const total = computeTotal({ jumlah, nationality, tripType, dayType })
  let basePerOrang = getBasePricePerOrang(nationality, tripType, dayType)
  
  if (nationality === "wni" && tripType === "private") {
    basePerOrang += 32000 // Tiket masuk WNI khusus private
  }

  const smallGroupCharge = jumlah < 4 ? PRICE.smallGroupCharge : 0
  const guideFee = tripType === "private" ? PRICE.privateGuideFee : 0

  return (
    <div className="rounded-[18px] border border-charcoal/10 bg-white p-5 md:p-8">
      {/* ── Header ── */}
      <div className="mb-8 text-center">
        <span className="inline-block rounded-full bg-gold/10 px-3 py-1 text-[11px] font-bold tracking-widest text-gold">
          HITUNG ESTIMASI
        </span>
        <h3 className="text-h3 mt-3">Estimasi Biaya Trip Kamu</h3>
        <p className="text-body-sm mt-2 text-charcoal/60">
          Transparan, no hidden fee. Default: Private Trip — bisa diganti ke Open Trip kapan aja.
        </p>
      </div>

      {/* ── Selectors ── */}
      <div className="flex flex-col gap-6">
        <div>
          <label className="text-body-sm mb-3 block font-semibold">Tipe Trip</label>
          <TripTypeToggle value={tripType} onChange={onTripTypeChange} />
        </div>

        <div>
          <label className="text-body-sm mb-3 block font-semibold">Kewarganegaraan</label>
          <NationalitySelector value={nationality} onChange={onNationalityChange} />
          {nationality === "wna" && (
            <DayTypeSelector value={dayType} onChange={onDayTypeChange} />
          )}
        </div>

        <div>
          <label className="text-body-sm mb-3 block font-semibold">Jumlah Orang</label>
          <div className="flex h-12 w-full max-w-[200px] items-center justify-between rounded-full border border-charcoal/15 bg-sand px-1">
            <button
              onClick={() => onJumlahChange(Math.max(1, jumlah - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal/60 transition-colors hover:bg-white hover:text-charcoal disabled:opacity-50"
              disabled={jumlah <= 1}
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="text-body font-bold">{jumlah}</span>
            <button
              onClick={() => onJumlahChange(Math.min(30, jumlah + 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal/60 transition-colors hover:bg-white hover:text-charcoal disabled:opacity-50"
              disabled={jumlah >= 30}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Output Card (Sticky desktop styling if needed) ── */}
      <div className="mt-8 rounded-[14px] bg-charcoal p-5 text-sand md:sticky md:top-24">
        <h4 className="text-[15px] font-semibold text-gold">Rincian Biaya</h4>
        
        <div className="mt-4 flex flex-col gap-3 text-[14px]">
          <div className="flex justify-between">
            <span className="text-sand/70">Layanan + Tiket ({jumlah} x {formatRupiah(basePerOrang)})</span>
            <span>{formatRupiah(basePerOrang * jumlah)}</span>
          </div>

          {guideFee > 0 && (
            <div className="flex justify-between">
              <span className="text-sand/70">Private Guide Fee (per rombongan)</span>
              <span>{formatRupiah(guideFee)}</span>
            </div>
          )}

          {smallGroupCharge > 0 && (
            <div className="flex justify-between text-amber-400">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" />
                Biaya Grup Kecil (&lt; 4 orang)
              </span>
              <span>{formatRupiah(smallGroupCharge)}</span>
            </div>
          )}
        </div>

        <div className="mt-5 border-t border-sand/10 pt-5">
          <div className="flex items-end justify-between">
            <span className="text-[15px] font-semibold text-sand/70">Total Estimasi</span>
            <span className="text-h3 text-gold">{formatRupiah(total)}</span>
          </div>
        </div>

        <button
          onClick={onScrollToForm}
          className="mt-6 w-full rounded-full bg-gold py-3.5 text-[15px] font-bold text-charcoal transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Lanjut ke Pembayaran &rarr;
        </button>
      </div>
    </div>
  )
}
