"use client"

import { cn } from "cn"
import { motion, type Variants } from "framer-motion"
import { Camera, Gift } from "lucide-react"
import { ROUTE_STEPS, ROUTE_BONUS } from "@/lib/constants"
import { BadgeSection } from "@/components/shared/BadgeSection"

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

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      delay: i * 0.1,
      ease: EASE_OUT,
    },
  }),
}

export function RouteSection() {
  return (
    <section
      id="rute"
      className="bg-sand py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* ── Header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <BadgeSection label="RUTE 7KM" variant="sand" />

          <h2 className="text-h1 mt-4 max-w-lg">
            Dari Basecamp ke{" "}
            <span className="text-gold">Curug Kembar</span>
          </h2>

          <p className="text-body mt-4 max-w-xl text-charcoal/70">
            5 checkpoint utama melewati jembatan gantung, sungai, dan hutan
            lumut — ditutup air terjun kembar setinggi 50 meter.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="mt-12 pl-7 md:pl-10">
          {ROUTE_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              className="relative border-l-2 border-charcoal/10 pb-10 pl-8 last:pb-0"
              custom={i}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
            >
              {/* Timeline dot — gold for milestone, charcoal for regular */}
              <span
                className={cn(
                  "absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-[3px]",
                  step.highlight
                    ? "border-gold bg-gold"
                    : "border-charcoal/20 bg-sand"
                )}
              >
                {step.highlight && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>

              {/* Step number label */}
              <span
                className={cn(
                  "text-badge",
                  step.highlight ? "text-gold" : "text-charcoal/40"
                )}
              >
                STEP {step.step}
              </span>

              {/* Title */}
              <h3
                className={cn(
                  "text-h3 mt-1",
                  step.highlight && "text-charcoal"
                )}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-body-sm mt-1.5 max-w-md text-charcoal/60">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Bonus Pulang ── */}
        <motion.div
          className="mt-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <div className="flex items-center gap-2 text-charcoal/50">
            <Gift className="h-4 w-4 text-gold" />
            <span className="text-badge">BONUS JALUR PULANG</span>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {ROUTE_BONUS.map((bonus) => (
              <div
                key={bonus.title}
                className={cn(
                  "group flex items-start gap-3 rounded-[14px] border border-charcoal/8 bg-white/60 p-5",
                  "transition-all duration-300",
                  "hover:border-charcoal/15 hover:shadow-[var(--shadow-soft)]"
                )}
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Camera className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-h4">{bonus.title}</h4>
                  <p className="text-body-sm mt-1 text-charcoal/60">
                    {bonus.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
