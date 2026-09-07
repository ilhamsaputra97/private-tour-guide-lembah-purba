"use client"

import { motion, type Variants } from "framer-motion"
import { FAQ_ITEMS } from "@/lib/constants"
import { BadgeSection } from "@/components/shared/BadgeSection"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

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

export function FAQSection() {
  return (
    <section
      id="faq"
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
          <BadgeSection label="FAQ" variant="sand" />

          <h2 className="text-h1 mt-4 max-w-lg">
            Pertanyaan yang{" "}
            <span className="text-gold">Sering Ditanya</span>
          </h2>

          <p className="text-body mt-4 max-w-xl text-charcoal/70">
            Belum yakin? Cek jawaban dari pertanyaan yang paling sering kami
            terima.
          </p>
        </motion.div>

        {/* ── Accordion ── */}
        <motion.div
          className="mt-10 max-w-3xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <Accordion className="flex w-full flex-col gap-1">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                className="rounded-[14px] border border-charcoal/8 bg-white/60 px-5 transition-colors hover:border-charcoal/15 data-open:border-charcoal/15 data-open:bg-white/80"
              >
                <AccordionTrigger className="py-4 text-[15px] font-semibold text-charcoal hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-sm text-charcoal/65">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
