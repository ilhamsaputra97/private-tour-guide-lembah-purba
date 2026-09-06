import { cn } from "cn"
import type { ReactNode } from "react"

const sizeStyles = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
} as const

interface IconCircleProps {
  size?: keyof typeof sizeStyles
  children: ReactNode
  className?: string
}

export function IconCircle({
  size = "sm",
  children,
  className,
}: IconCircleProps) {
  return (
    <span
      className={cn(
        "inline-grid place-items-center rounded-full bg-charcoal text-gold",
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  )
}
