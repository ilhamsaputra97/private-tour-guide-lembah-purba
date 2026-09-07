"use client"

import { useState, useRef, Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CostCalculator } from "@/components/home/CostCalculator"
import { ReservationForm, type ReservationFormData } from "@/components/home/ReservationForm"
import { PaymentMethodSummary } from "@/components/payment/PaymentMethodSummary"
import { PaymentButton } from "@/components/payment/PaymentButton"
import { computeTotal } from "@/lib/pricing"

function BookingContent() {
  const searchParams = useSearchParams()
  const tripParam = searchParams.get("trip")

  const [jumlah, setJumlah] = useState(2)
  const [tripType, setTripType] = useState<"private" | "open">(
    tripParam === "open" ? "open" : "private"
  )

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [formData, setFormData] = useState<ReservationFormData | null>(null)

  const [paymentOption, setPaymentOption] = useState<"dp" | "full">("full")

  const formRef = useRef<HTMLDivElement>(null)

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleFormSubmit = (data: ReservationFormData) => {
    setFormData(data)
    setIsFormSubmitted(true)
  }

  // Jika URL parameter berubah
  useEffect(() => {
    if (tripParam === "open" || tripParam === "private") {
      setTripType(tripParam)
    }
  }, [tripParam])

  const total = computeTotal({ jumlah, tripType })
  const amountToPay = paymentOption === "dp" ? Math.round(total * 0.3) : total

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-32 pt-28 md:px-8 md:pb-28">
      <div className="mb-10 text-center lg:text-left">
        <h1 className="font-display text-[38px] leading-[0.95] text-charcoal md:text-[48px] lg:text-[68px]">
          Booking & Bayar Online
        </h1>
        <p className="mt-4 text-[16px] text-charcoal/70 md:text-[18px]">
          Tentukan paket, lengkapi data, dan amankan slotmu sekarang via Midtrans.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">

        {/* Left Column: Kalkulator (Section 8) */}
        <div className="flex flex-col gap-10 lg:sticky lg:top-24">
          <CostCalculator
            jumlah={jumlah}
            onJumlahChange={setJumlah}
            tripType={tripType}
            onTripTypeChange={setTripType}
            onScrollToForm={handleScrollToForm}
          />
        </div>

        {/* Right Column: Form (Section 9) & Payment */}
        <div ref={formRef} className="flex flex-col gap-8">
          <ReservationForm
            jumlah={jumlah}
            tripType={tripType}
            onSubmitSuccess={handleFormSubmit}
          />

          {/* Payment Section - Muncul setelah form disubmit */}
          {isFormSubmitted ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <PaymentMethodSummary
                total={total}
                paymentOption={paymentOption}
                onPaymentOptionChange={setPaymentOption}
              />

              {/* PaymentButton sticky di mobile, normal di desktop */}
              <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-charcoal/10 bg-white p-5 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:static lg:border-t-0 lg:bg-transparent lg:p-0 lg:shadow-none mt-6 lg:mt-0">
                <PaymentButton
                  formData={{
                    nama: formData?.name,
                    wa: formData?.whatsapp,
                    tanggal: formData?.date,
                    catatan: formData?.notes,
                    jumlah,
                    tripType,
                  }}
                  total={total}
                  paymentOption={paymentOption}
                />
              </div>
            </div>
          ) : (
            <div className="hidden rounded-[18px] border border-dashed border-charcoal/20 bg-white/50 p-8 text-center text-charcoal/50 lg:block">
              Lengkapi formulir reservasi untuk memunculkan metode pembayaran.
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-sandalt">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <BookingContent />
      </Suspense>
    </main>
  )
}
