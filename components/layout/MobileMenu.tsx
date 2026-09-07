"use client"

import Link from "next/link"
import { cn } from "cn"
import { motion, AnimatePresence } from "framer-motion"
import { ButtonRA } from "@/components/shared/ButtonRA"
import { BadgeSlotLimited } from "@/components/shared/BadgeSlotLimited"

// ── Nav items — same as Navbar.tsx ──
const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Private Guide", href: "/private-guide" },
  { label: "Paket", href: "/paket" },
  { label: "Rute", href: "/rute" },
  { label: "Safety", href: "/safety" },
] as const

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  pathname: string
}

// ── Animation config ──
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, delay: 0.1 },
  },
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
const EASE_IN: [number, number, number, number] = [0.55, 0, 1, 0.45]

const menuVariants = {
  hidden: { y: "-100%" },
  visible: {
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.35, ease: EASE_IN },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      delay: 0.25 + i * 0.06,
      ease: EASE_OUT,
    },
  }),
}

export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu-overlay"
          className="fixed inset-0 z-40 lg:hidden"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Full-screen menu panel */}
          <motion.div
            className="absolute inset-0 flex flex-col bg-charcoal px-5 pt-20 pb-8"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* ── CTA Private Guide — PALING ATAS, tombol besar gold ── */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.4, delay: 0.15, ease: EASE_OUT },
              }}
            >
              <Link href="/private-guide" onClick={onClose}>
                <ButtonRA variant="primary" size="lg" className="w-full text-[16px]">
                  PRIVATE GUIDE
                </ButtonRA>
              </Link>
            </motion.div>

            {/* ── Nav links ── */}
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map(({ label, href }, i) => {
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(href)
                return (
                  <motion.div
                    key={href}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={href}
                      onClick={onClose}
                      className={cn(
                        "block rounded-xl px-4 py-3.5 text-[18px] font-medium transition-colors",
                        isActive
                          ? "bg-sand/10 text-gold"
                          : "text-sand/70 hover:bg-sand/5 hover:text-sand"
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* ── Booking link ── */}
            <motion.div
              className="mt-6"
              custom={NAV_ITEMS.length}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                href="/booking"
                onClick={onClose}
                className="block rounded-xl border border-sand/10 px-4 py-3.5 text-center text-[16px] font-medium text-sand/70 transition-colors hover:border-sand/20 hover:text-sand"
              >
                Booking
              </Link>
            </motion.div>

            {/* ── Bottom: Badge ── */}
            <div className="mt-auto flex flex-col items-center gap-4 pt-8">
              <BadgeSlotLimited />
              <p className="text-[11px] text-sand/30">
                © 2026 Rimba Awal Expedition
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
