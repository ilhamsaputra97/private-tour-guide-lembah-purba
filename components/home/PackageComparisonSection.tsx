"use client"

import { cn } from "cn"
import { motion, type Variants } from "framer-motion"
import { Info } from "lucide-react"
import { PRIVATE_PACKAGE, OPEN_PACKAGE } from "@/lib/constants"
import { BadgeSection } from "@/components/shared/BadgeSection"
import { PackageCard } from "@/components/shared/PackageCard"

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

export function PackageComparisonSection() {
  return (
    <section
      id="package-comparison"
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
          <BadgeSection label="PILIH PAKET" variant="sand" />

          <h2 className="text-h1 mt-4 max-w-lg">
            Private Trip atau{" "}
            <span className="text-charcoal/50">Open Trip?</span>
          </h2>

          <p className="text-body mt-4 max-w-xl text-charcoal/65">
            Dua cara menjelajah hutan yang sama — pilih yang paling cocok
            untuk rombongan kamu.
          </p>
        </motion.div>

        {/* ── 2 PackageCards — grid md:grid-cols-2
            Private SELALU di atas/kiri (order-first tidak diperlukan karena
            DOM order sudah benar: Private render duluan) ── */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 md:items-start">
          <PackageCard {...PRIVATE_PACKAGE} />
          <PackageCard {...OPEN_PACKAGE} />
        </div>

        {/* ── Footer note — charge grup kecil ── */}
        <motion.div
          className={cn(
            "mt-6 flex items-start gap-2.5 rounded-[12px]",
            "border border-charcoal/8 bg-white/60 p-4"
          )}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p className="text-body-sm text-charcoal/60">
            Charge grup kecil Rp100K berlaku untuk rombongan di bawah 4
            orang, baik Private maupun Open Trip.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
