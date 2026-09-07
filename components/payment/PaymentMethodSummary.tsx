"use client"

import { cn, formatRupiah } from "@/lib/utils"

interface PaymentMethodSummaryProps {
  total: number
  paymentOption: "dp" | "full"
  onPaymentOptionChange: (val: "dp" | "full") => void
}

export function PaymentMethodSummary({
  total,
  paymentOption,
  onPaymentOptionChange,
}: PaymentMethodSummaryProps) {
  const dpAmount = Math.round(total * 0.3)

  return (
    <div className="rounded-[18px] border border-charcoal/10 bg-white p-5 md:p-8">
      <h4 className="text-h4 mb-4">Pilih Metode Pembayaran</h4>
      
      <div className="flex flex-col gap-3">
        <label
          className={cn(
            "flex cursor-pointer items-center justify-between rounded-[12px] border p-4 transition-colors",
            paymentOption === "full"
              ? "border-gold bg-gold/5"
              : "border-charcoal/10 hover:border-charcoal/20"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border-2",
                paymentOption === "full" ? "border-gold bg-gold" : "border-charcoal/20"
              )}
            >
              {paymentOption === "full" && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
            <div>
              <p className="font-semibold text-charcoal">Bayar Lunas</p>
              <p className="text-[13px] text-charcoal/60">Pembayaran penuh di awal</p>
            </div>
          </div>
          <span className="font-bold text-charcoal">{formatRupiah(total)}</span>
          <input
            type="radio"
            name="paymentOption"
            value="full"
            checked={paymentOption === "full"}
            onChange={() => onPaymentOptionChange("full")}
            className="hidden"
          />
        </label>

        <label
          className={cn(
            "flex cursor-pointer items-center justify-between rounded-[12px] border p-4 transition-colors",
            paymentOption === "dp"
              ? "border-gold bg-gold/5"
              : "border-charcoal/10 hover:border-charcoal/20"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border-2",
                paymentOption === "dp" ? "border-gold bg-gold" : "border-charcoal/20"
              )}
            >
              {paymentOption === "dp" && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
            <div>
              <p className="font-semibold text-charcoal">DP 30%</p>
              <p className="text-[13px] text-charcoal/60">Sisa dibayar di basecamp</p>
            </div>
          </div>
          <span className="font-bold text-charcoal">{formatRupiah(dpAmount)}</span>
          <input
            type="radio"
            name="paymentOption"
            value="dp"
            checked={paymentOption === "dp"}
            onChange={() => onPaymentOptionChange("dp")}
            className="hidden"
          />
        </label>
      </div>
    </div>
  )
}
