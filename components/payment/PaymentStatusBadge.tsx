import { cn } from "@/lib/utils"

export type PaymentStatus = "pending" | "settlement" | "expire" | "cancel" | "deny"

interface PaymentStatusBadgeProps {
  status: PaymentStatus
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  let label = "Pending"
  let colorClass = "bg-amber-100 text-amber-800 border-amber-300"

  switch (status) {
    case "settlement":
      label = "Berhasil"
      colorClass = "bg-green-100 text-green-800 border-green-300"
      break
    case "pending":
      label = "Menunggu Pembayaran"
      colorClass = "bg-amber-100 text-amber-800 border-amber-300"
      break
    case "expire":
    case "cancel":
    case "deny":
      label = status === "expire" ? "Kedaluwarsa" : "Gagal / Dibatalkan"
      colorClass = "bg-red-100 text-red-800 border-red-300"
      break
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold",
        colorClass
      )}
    >
      {label}
    </span>
  )
}
