"use client"

import Link from "next/link"
import { cn } from "cn"
import { motion, type Variants } from "framer-motion"
import { Compass, CalendarClock } from "lucide-react"
import { ButtonRA } from "@/components/shared/ButtonRA"

// ── Framer Motion variants — 06-COMPONENTS.md § Animasi ──
// Hero H1: stagger per baris (bukan per kata)
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden rounded-[18px] bg-charcoal text-sand"
    >
      {/* Gold-glow radial — sudut kanan atas */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 85% 10%, rgba(200,162,74,0.25), transparent 60%)",
        }}
      />

      {/* Hero content */}
      <div className="relative mx-auto flex min-h-screen max-w-[1200px] flex-col justify-center px-5 py-20 md:px-10 md:py-32">
        {/* Pill label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="text-badge inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-sand/80">
            TRIP PRIBADI • Ekspedisi Lembah Purba
          </span>
        </motion.div>

        {/* Headline — serif Fraunces, stagger per baris */}
        <motion.h1
          className={cn("text-display-hero mt-6 max-w-3xl")}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="block" variants={lineVariants}>
            <span className="font-bold uppercase text-gold">Hutan yang sama.</span>
          </motion.span>
          <motion.span className="block" variants={lineVariants}>
            Pace yang berbeda.
          </motion.span>
        </motion.h1>

        {/* Info card */}
        <motion.div
          className="mt-8 max-w-md rounded-[12px] bg-sand p-3 text-charcoal"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        >
          <p className="text-badge text-charcoal/60">PRIVATE GUIDE TRACKING</p>
          <p className="text-body-sm mt-1">
            Guide khusus rombongan kamu • Rute 6KM Pulang Pergi • Lembah Purba, Situgunung, Taman Nasional Gunung Gede Pangrango
          </p>
        </motion.div>

        {/* Dual CTA */}
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.85 }}
        >
          <Link href="/booking">
            <ButtonRA variant="primary" size="lg">
              Booking Guide Pribadi
            </ButtonRA>
          </Link>
          <Link href="/paket">
            <ButtonRA
              variant="secondary"
              size="lg"
              className="border-sand/20 text-sand hover:bg-sand/10"
            >
              Lihat Open Trip
            </ButtonRA>
          </Link>
        </motion.div>

        {/* Footer hero — location + schedule */}
        <motion.div
          className="mt-auto flex flex-wrap items-center gap-6 pt-16 text-sand/60"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0 }}
        >
          <span className="text-caption inline-flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 text-gold" />
            SITU GUNUNG, SUKABUMI
          </span>
          <span className="text-caption inline-flex items-center gap-1.5">
            <CalendarClock className="h-3.5 w-3.5 text-gold" />
            Jadwal fleksibel
          </span>
        </motion.div>
      </div>
    </section>
  )
}
