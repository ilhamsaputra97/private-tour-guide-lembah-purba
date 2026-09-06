"use client"

import { cn } from "cn"
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"

const variantStyles = {
  /** Gold CTA — HANYA untuk Private Guide / Bayar Sekarang */
  primary:
    "bg-gold text-charcoal hover:bg-gold/90 active:bg-gold/80 shadow-[var(--shadow-gold)]",
  /** Ghost — untuk Open Trip / aksi sekunder (sengaja kalah menonjol) */
  secondary:
    "border border-charcoal/20 text-charcoal hover:bg-charcoal/5 active:bg-charcoal/10",
  /** Dark variant — di atas background terang */
  dark:
    "bg-charcoal text-sand hover:bg-charcoal/90 active:bg-charcoal/80",
} as const

const sizeStyles = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-[14px]",
  lg: "h-12 px-8 text-[15px]",
} as const

interface ButtonRAProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
  children: ReactNode
}

export const ButtonRA = forwardRef<HTMLButtonElement, ButtonRAProps>(
  function ButtonRA(
    { variant = "primary", size = "md", className, children, ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "cursor-pointer select-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
