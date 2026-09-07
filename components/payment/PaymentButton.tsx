"use client"

import { useState } from "react"

interface PaymentButtonProps {
  amountToPay: number
  // formData: any (akan ditambahkan di tahap integrasi Midtrans)
}

export function PaymentButton({ amountToPay }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePay = async () => {
    setIsLoading(true)
    // TODO: Integrasi pemanggilan API Midtrans /api/payment/create-transaction
    // Simulasi loading sementara
    setTimeout(() => {
      setIsLoading(false)
      alert("Midtrans integration will be added in the next phase!")
    }, 1500)
  }

  return (
    <button
      onClick={handlePay}
      disabled={isLoading}
      className="mt-4 w-full rounded-full bg-gold py-4 text-[16px] font-bold text-charcoal transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
    >
      {isLoading ? "Memproses Pembayaran..." : "Bayar Sekarang"}
    </button>
  )
}
