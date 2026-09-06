import { cn } from "cn"

const variantStyles = {
  charcoal: "bg-charcoal text-sand",
  sand: "bg-sandalt text-charcoal",
  gold: "bg-gold text-charcoal",
} as const

interface BadgeSectionProps {
  label: string
  variant: "charcoal" | "sand" | "gold"
  className?: string
}

export function BadgeSection({ label, variant, className }: BadgeSectionProps) {
  return (
    <span
      className={cn(
        "text-badge inline-flex items-center px-2.5 py-1 rounded-full",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
