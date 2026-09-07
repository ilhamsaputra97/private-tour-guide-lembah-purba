"use client"

import { cn } from "cn"
import { motion, type Variants } from "framer-motion"
import {
  Clock,
  Footprints,
  Shirt,
  Heart,
  AlertTriangle,
  Check,
  type LucideIcon,
} from "lucide-react"
import { SAFETY_CHECKLIST, SAFETY_WARNING } from "@/lib/constants"
import { BadgeSection } from "@/components/shared/BadgeSection"

// ── Icon map ──
const ICON_MAP: Record<string, LucideIcon> = {
  Clock,
  Footprints,
  Shirt,
  Heart,
}

// ── Framer Motion ──
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: EASE_OUT,
    },
  }),
}

export function SafetySection() {
  return (
    <section
      id="safety"
      className="bg-sandalt py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* ── Header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <BadgeSection label="KESELAMATAN" variant="sand" />

          <h2 className="text-h1 mt-4 max-w-lg">
            Persiapan Sebelum{" "}
            <span className="text-gold">Trekking</span>
          </h2>

          <p className="text-body mt-4 max-w-xl text-charcoal/70">
            Ikuti checklist ini supaya trekking kamu aman, nyaman, dan tanpa
            drama.
          </p>
        </motion.div>

        {/* ── 4 ChecklistCards — grid-cols-2 desktop ── */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {SAFETY_CHECKLIST.map((item, i) => {
            const Icon = ICON_MAP[item.icon]
            return (
              <motion.div
                key={item.title}
                className={cn(
                  "group flex items-start gap-4 rounded-[18px] border border-charcoal/8 bg-white/60 p-5",
                  "transition-all duration-300",
                  "hover:border-charcoal/15 hover:shadow-[var(--shadow-soft)]"
                )}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {/* Icon circle */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-gold">
                  {Icon && <Icon className="h-[18px] w-[18px]" />}
                </span>

                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <h3 className="text-h4 flex-1">{item.title}</h3>
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  </div>
                  <p className="text-body-sm mt-1.5 text-charcoal/60">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── WarningCard — full width, bg-charcoal text-gold ── */}
        <motion.div
          className={cn(
            "mt-6 flex items-start gap-3 rounded-[14px] bg-charcoal p-5 md:p-6",
          )}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-h4 text-gold">{SAFETY_WARNING.title}</h3>
            <p className="text-body-sm mt-2 text-sand/70">
              {SAFETY_WARNING.desc}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
