import Link from "next/link"
import { cn } from "cn"
import { Wallet, CreditCard, QrCode, MessageCircle } from "lucide-react"

// ── Social / contact links ──
const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/6285123456789",
    icon: MessageCircle,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/rimbaawal",
    icon: ({ className }: { className?: string }) => (
      // Lucide doesn't have an Instagram icon — use inline SVG
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <rect width="20" height="20" x="2" y="2" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Maps Basecamp",
    href: "https://maps.app.goo.gl/example",
    icon: ({ className }: { className?: string }) => (
      // Map pin for basecamp location
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
] as const

// ── Payment method icons ──
const PAYMENT_ICONS = [
  { icon: QrCode, label: "QRIS" },
  { icon: Wallet, label: "Virtual Account" },
  { icon: CreditCard, label: "Kartu Kredit/Debit" },
] as const

export function Footer() {
  return (
    <footer className="bg-charcoal-dark text-sand/70">
      <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-12">
        {/* ── Main grid: 3 columns on desktop ── */}
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* ── Kiri: Copyright ── */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="group inline-flex flex-col leading-none"
            >
              <span className="font-heading text-[16px] font-semibold text-sand/80 transition-colors group-hover:text-sand">
                Lembah Purba
              </span>
              <span className="font-heading text-[8px] font-medium tracking-[0.28em] uppercase text-sand/40 transition-colors group-hover:text-sand/50">
                Private Tour Guide
              </span>
            </Link>
            <p className="mt-2 text-[12px] text-sand/40">
              © 2026 Rimba Awal Expedition
            </p>
          </div>

          {/* ── Tengah: Social links ── */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-badge text-sand/30">HUBUNGI KAMI</p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full",
                    "bg-sand/5 text-sand/50 transition-all duration-200",
                    "hover:bg-gold/15 hover:text-gold"
                  )}
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Kanan: Pembayaran Aman via Midtrans ── */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="inline-flex items-center gap-2 rounded-full bg-sand/5 px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10.5px] font-semibold tracking-[0.06em] text-sand/60">
                Pembayaran Aman via Midtrans
              </span>
            </div>
            <div className="flex items-center gap-2">
              {PAYMENT_ICONS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    "bg-sand/5 text-sand/40 transition-colors",
                    "hover:bg-sand/10 hover:text-sand/60"
                  )}
                  title={label}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider + bottom bar ── */}
        <div className="mt-10 border-t border-sand/5 pt-5">
          <p className="text-center text-[11px] text-sand/25">
            Rimba Awal Expedition — Trekking privat di jantung TNGGP, Situ Gunung Sukabumi
          </p>
        </div>
      </div>
    </footer>
  )
}
