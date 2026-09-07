"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "cn"
import { BadgeSlotLimited } from "@/components/shared/BadgeSlotLimited"
import { ButtonRA } from "@/components/shared/ButtonRA"
import { MobileMenu } from "./MobileMenu"
import { Menu, X } from "lucide-react"

// ── Nav items — 04-IA-ROUTES.md § Navigasi ──
const NAV_ITEMS: { label: string; href: string; highlight?: boolean }[] = [
  { label: "Beranda", href: "/" },
  { label: "Private Guide", href: "/private-guide", highlight: true },
  { label: "Paket", href: "/paket" },
  { label: "Rute", href: "/rute" },
  { label: "Safety", href: "/safety" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll for subtle shadow enhancement
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "border-b border-charcoal/10",
          "bg-sand/85 backdrop-blur-xl",
          "transition-shadow duration-300",
          scrolled && "shadow-[0_1px_12px_-4px_rgba(27,38,34,0.08)]"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:h-[72px] md:px-8">
          {/* ── Logo — "Lembah Purba" di atas, "Private Tour Guide" di bawah ── */}
          <Link
            href="/"
            className="group flex flex-col items-start leading-none"
            aria-label="Lembah Purba — Private Tour Guide, kembali ke beranda"
          >
            <span
              className="font-heading text-[18px] font-semibold tracking-[0.01em] text-charcoal transition-colors group-hover:text-charcoal/80 md:text-[20px]"
            >
              Lembah Purba
            </span>
            <span
              className="font-heading text-[9.5px] font-medium tracking-[0.28em] uppercase text-charcoal/55 transition-colors group-hover:text-charcoal/45 md:text-[10.5px] md:tracking-[0.31em]"
            >
              Private Tour Guide
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map(({ label, href, highlight }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-all duration-200",
                      isActive
                        ? "text-charcoal"
                        : "text-charcoal/60 hover:text-charcoal",
                      highlight && !isActive && "text-gold hover:text-gold/80",
                      highlight && isActive && "text-gold"
                    )}
                  >
                    {label}
                    {/* Active indicator dot */}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-current" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* ── Right side: badge + CTAs (desktop) + hamburger (mobile) ── */}
          <div className="flex items-center gap-3">
            {/* BadgeSlotLimited — desktop only */}
            <div className="hidden xl:block">
              <BadgeSlotLimited />
            </div>

            {/* CTA utama — PRIVATE GUIDE (desktop only) */}
            <Link href="/private-guide" className="hidden lg:block">
              <ButtonRA variant="primary" size="sm">
                PRIVATE GUIDE
              </ButtonRA>
            </Link>

            {/* CTA sekunder — Booking (teks biasa, desktop only) */}
            <Link
              href="/booking"
              className={cn(
                "hidden text-[13px] font-medium text-charcoal/60 transition-colors hover:text-charcoal lg:block"
              )}
            >
              Booking
            </Link>

            {/* Hamburger — mobile/tablet */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5 lg:hidden"
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Spacer so page content doesn't hide behind sticky header */}
      <div className="h-16 md:h-[72px]" />

      {/* Mobile menu overlay */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  )
}
