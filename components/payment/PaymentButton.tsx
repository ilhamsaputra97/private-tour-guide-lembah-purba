"use client"

import { useState } from "react"

declare global {
  interface Window {
    snap: any
  }
}

interface PaymentButtonProps {
  formData: Record<string, unknown>
  total: number
  paymentOption: "dp" | "full"
}

export function PaymentButton({ formData, total, paymentOption }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePay = async () => {
    setIsLoading(true)
    
    try {
      const res = await fetch("/api/payment/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, total, paymentOption }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat transaksi")
      }

      window.snap.pay(data.snapToken, {
        onSuccess: () => {
          window.location.href = `/booking/sukses?order_id=${data.orderId}`
        },
        onPending: () => {
          window.location.href = `/booking/sukses?order_id=${data.orderId}`
        },
        onError: () => {
          alert("Pembayaran gagal, coba lagi ya.")
          setIsLoading(false)
        },
        onClose: () => {
          setIsLoading(false)
        },
      })
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan, coba lagi.")
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-3">
      <button
        onClick={handlePay}
        disabled={isLoading}
        className="w-full rounded-full bg-gold py-4 text-[16px] font-bold text-charcoal transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
      >
        {isLoading ? "Memproses..." : "Bayar Sekarang via Midtrans"}
      </button>
      <p className="text-center text-[12px] text-charcoal/50">
        Pembayaran diproses aman oleh Midtrans. Data kamu tidak disimpan di server kami selain untuk keperluan booking.
      </p>
    </div>
  )
}
