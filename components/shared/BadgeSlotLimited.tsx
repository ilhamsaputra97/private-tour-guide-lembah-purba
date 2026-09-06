import { cn } from "cn"

interface BadgeSlotLimitedProps {
  className?: string
}

export function BadgeSlotLimited({ className }: BadgeSlotLimitedProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
        "bg-gold/10 border border-gold/25",
        className
      )}
    >
      {/* Animated pulse dot */}
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
      </span>

      <span className="text-[11px] font-semibold text-gold">
        SLOT TERBATAS / HARI
      </span>
    </span>
  )
}
