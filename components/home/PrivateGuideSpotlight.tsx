"use client"

import Link from "next/link"
import { cn } from "cn"
import { motion, type Variants } from "framer-motion"
import {
  UserCog,
  CalendarClock,
  Route,
  Users2,
  type LucideIcon,
} from "lucide-react"
import { PRIVATE_GUIDE_FEATURES } from "@/lib/constants"
import { IconCircle } from "@/components/shared/IconCircle"
import { ButtonRA } from "@/components/shared/ButtonRA"

// ── Icon map — 01-DESIGN-SYSTEM.md § 6 ──
const ICON_MAP: Record<string, LucideIcon> = {
  UserCog,
  CalendarClock,
  Route,
  Users2,
}

// ── Framer Motion — 06-COMPONENTS.md § Animasi ──
// PrivateGuideSpotlight card: fade up + slight scale, delay 0.08/card
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

export function PrivateGuideSpotlight() {
  return (
    <section
      id="private-guide-spotlight"
      className="relative overflow-hidden rounded-[18px] bg-charcoal text-sand"
      style={{ marginTop: -1 }} // seamless blend with HeroSection
    >
      {/* Gold-glow — lebih terang dari hero */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(200,162,74,0.35), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 py-20 md:px-10 md:py-32">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <span className="text-badge inline-flex items-center rounded-full border border-gold/25 bg-gold/10 px-3 py-1.5 text-gold">
            KENAPA PRIVATE GUIDE?
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className={cn("text-h1 mt-5 max-w-xl")}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          Bukan Rombongan Orang Lain.{" "}
          <span className="text-gold">Ini Trip Kamu.</span>
        </motion.h2>

        {/* 4 Feature cards — grid 2x2 desktop / 1 col mobile */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {PRIVATE_GUIDE_FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon]
            return (
              <motion.div
                key={feature.title}
                className="group rounded-[18px] border border-white/8 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-gold/20 hover:bg-white/[0.07]"
                style={{ boxShadow: "var(--shadow-card)" }}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <IconCircle
                  size="md"
                  className="bg-gold/10 text-gold group-hover:bg-gold/20 transition-colors"
                >
                  {Icon && <Icon className="h-[18px] w-[18px]" />}
                </IconCircle>
                <h3 className="text-h3 mt-3 text-sand">{feature.title}</h3>
                <p className="text-body-sm mt-2 text-sand/70">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Price Anchor Card — full width */}
        <motion.div
          className="mt-6 rounded-[18px] border border-gold/25 bg-charcoal-dark p-6 md:p-8"
          style={{ boxShadow: "var(--shadow-gold)" }}
          custom={4}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-price-lg text-gold">
                Rp350.000
                <span className="text-body ml-1 text-sand/60">/orang</span>
              </p>
              <p className="text-body mt-1 text-sand/80">
                + Rp300.000{" "}
                <span className="text-sand/50">
                  biaya guide privat (flat per rombongan)
                </span>
              </p>
              <p className="text-body-sm mt-3 text-sand/50">
                Estimasi lengkap tergantung jumlah orang —{" "}
                <Link
                  href="#booking"
                  className="text-gold underline underline-offset-2 hover:text-gold/80"
                >
                  hitung di kalkulator
                </Link>
              </p>
            </div>

            <Link href="/booking" className="shrink-0">
              <ButtonRA variant="primary" size="lg">
                Booking Guide Pribadi Sekarang
              </ButtonRA>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
