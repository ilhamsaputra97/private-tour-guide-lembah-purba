"use client"

import { useState, useRef, useEffect } from "react"
import { CostCalculator } from "./CostCalculator"
import { ReservationForm, type ReservationFormData } from "./ReservationForm"
import { PaymentMethodSummary } from "@/components/payment/PaymentMethodSummary"
import { PaymentButton } from "@/components/payment/PaymentButton"
import { PendingPaymentCard } from "@/components/payment/PendingPaymentCard"
import { computeTotal } from "@/lib/pricing"

export function BookingSection() {
  // Lifted state for calculation and form
  const [jumlah, setJumlah] = useState(2)
  const [tripType, setTripType] = useState<"private" | "open">("private")

  // State for form submission
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [formData, setFormData] = useState<ReservationFormData | null>(null)

  // State for payment
  const [paymentOption, setPaymentOption] = useState<"dp" | "full">("full")

  // Ref for auto-scrolling
  const formRef = useRef<HTMLDivElement>(null)
  const paymentRef = useRef<HTMLDivElement>(null)

  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('rae_pending_order_id')
    if (stored) setPendingOrderId(stored)
  }, [])

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleFormSubmit = (data: ReservationFormData) => {
    setFormData(data)
    setIsFormSubmitted(true)
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 100)
  }

  const total = computeTotal({ jumlah, tripType })
  const amountToPay = paymentOption === "dp" ? Math.round(total * 0.3) : total

  return (
    <section id="booking" className="bg-sandalt py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {mounted && pendingOrderId ? (
          <PendingPaymentCard
            orderId={pendingOrderId}
            onResolved={() => setPendingOrderId(null)}
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
            {/* Left Column: Kalkulator (Section 8) */}
            <div className="flex flex-col gap-10">
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
              {isFormSubmitted && (
                <div ref={paymentRef} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <PaymentMethodSummary
                    total={total}
                    paymentOption={paymentOption}
                    onPaymentOptionChange={setPaymentOption}
                  />
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
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
