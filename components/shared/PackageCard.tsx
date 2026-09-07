"use client"

import Link from "next/link"
import { cn } from "cn"
import { motion, type Variants } from "framer-motion"
import { Check } from "lucide-react"
import { ButtonRA } from "@/components/shared/ButtonRA"

// ── Types ──
interface PackageCardProps {
  variant: "private" | "open"
  title: string
  price: string
  inclusions: string[]
  badge: string
  ctaLabel: string
  featured?: boolean
}

// ── Framer Motion ──
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

// Subtle glow pulse for featured card — 06-COMPONENTS.md § Animasi
const glowVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.6, 0],
    transition: { duration: 1.8, delay: 0.3, ease: "easeInOut" },
  },
}

export function PackageCard({
  variant,
  title,
  price,
  inclusions,
  badge,
  ctaLabel,
  featured = false,
}: PackageCardProps) {
  const isFeatured = featured

  return (
    <motion.div
      className={cn(
        "relative flex flex-col rounded-[18px] p-6 md:p-7",
        "transition-all duration-300",
        isFeatured
          ? "border-2 border-gold bg-white md:scale-[1.03]"
          : "border border-charcoal/10 bg-white"
      )}
      style={{
        boxShadow: isFeatured ? "var(--shadow-gold)" : "var(--shadow-card)",
      }}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {/* Glow pulse overlay — featured only */}
      {isFeatured && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[18px]"
          style={{
            boxShadow: "0 0 40px 8px rgba(200,162,74,0.25)",
          }}
          variants={glowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
      )}

      {/* Badge */}
      <span
        className={cn(
          "text-badge inline-flex w-fit items-center rounded-full px-3 py-1",
          isFeatured
            ? "bg-gold text-charcoal"
            : "bg-charcoal/8 text-charcoal/60"
        )}
      >
        {badge}
      </span>

      {/* Title */}
      <h3 className="text-h2 mt-4">{title}</h3>

      {/* Price */}
      <p
        className={cn(
          "mt-2 font-mono text-[15px] font-semibold",
          isFeatured ? "text-gold" : "text-charcoal/70"
        )}
      >
        {price}
      </p>

      {/* Divider */}
      <div className="my-5 h-px bg-charcoal/8" />

      {/* Inclusions */}
      <ul className="flex flex-col gap-3">
        {inclusions.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                isFeatured
                  ? "bg-gold/15 text-gold"
                  : "bg-charcoal/8 text-charcoal/50"
              )}
            >
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
            <span className="text-body-sm text-charcoal/75">{item}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto pt-6">
        <Link
          href={
            variant === "private"
              ? "/booking?trip=private"
              : "/booking?trip=open"
          }
          className="block"
        >
          <ButtonRA
            variant={isFeatured ? "primary" : "secondary"}
            size="lg"
            className="w-full"
          >
            {ctaLabel}
          </ButtonRA>
        </Link>
      </div>
    </motion.div>
  )
}
