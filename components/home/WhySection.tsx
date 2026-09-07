"use client"

import { cn } from "cn"
import { motion, type Variants } from "framer-motion"
import { TreePine, Wind, Leaf, type LucideIcon } from "lucide-react"
import { WHY_CARDS } from "@/lib/constants"
import { IconCircle } from "@/components/shared/IconCircle"
import { BadgeSection } from "@/components/shared/BadgeSection"

// ── Icon map ──
const ICON_MAP: Record<string, LucideIcon> = {
  TreePine,
  Wind,
  Leaf,
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
      delay: i * 0.1,
      ease: EASE_OUT,
    },
  }),
}

export function WhySection() {
  return (
    <section
      id="why"
      className="bg-sand py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* ── Header: badge + title + intro ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <BadgeSection label="TENTANG HUTANNYA" variant="sand" />

          <h2 className="text-h1 mt-4 max-w-lg">
            Hutan TNGGP yang Masih{" "}
            <span className="text-gold">Perawan</span>
          </h2>

          <p className="text-body mt-4 max-w-xl text-charcoal/70">
            Ini bukan taman kota. Hutan hujan tropis di kawasan Taman Nasional
            Gunung Gede Pangrango ini umurnya ratusan tahun, dan kamu akan
            menjelajahinya dengan tempo kamu sendiri.
          </p>
        </motion.div>

        {/* ── 3 CardWhy — md:grid-cols-3 ── */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {WHY_CARDS.map((card, i) => {
            const Icon = ICON_MAP[card.icon]
            return (
              <motion.div
                key={card.title}
                className={cn(
                  "group rounded-[18px] border border-charcoal/8 bg-white/60 p-6",
                  "transition-all duration-300",
                  "hover:border-charcoal/15 hover:shadow-[var(--shadow-soft)]"
                )}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <IconCircle size="md">
                  {Icon && <Icon className="h-[18px] w-[18px]" />}
                </IconCircle>

                <h3 className="text-h3 mt-4">{card.title}</h3>
                <p className="text-body-sm mt-2 text-charcoal/65">
                  {card.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
