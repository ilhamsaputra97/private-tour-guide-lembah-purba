"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TripTypeToggleProps {
  value: "private" | "open"
  onChange: (value: "private" | "open") => void
}

export function TripTypeToggle({ value, onChange }: TripTypeToggleProps) {
  return (
    <div className="flex w-full overflow-hidden rounded-full border border-charcoal/10 bg-sand p-1 shadow-sm">
      <button
        type="button"
        onClick={() => onChange("private")}
        className={cn(
          "relative flex-1 rounded-full py-2.5 text-[15px] font-semibold transition-colors z-10",
          value === "private" ? "text-sand" : "text-charcoal/60 hover:text-charcoal"
        )}
      >
        {value === "private" && (
          <motion.div
            layoutId="triptype-bg"
            className="absolute inset-0 -z-10 rounded-full bg-charcoal"
            initial={false}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        Private Trip
      </button>
      <button
        type="button"
        onClick={() => onChange("open")}
        className={cn(
          "relative flex-1 rounded-full py-2.5 text-[15px] font-semibold transition-colors z-10",
          value === "open" ? "text-sand" : "text-charcoal/60 hover:text-charcoal"
        )}
      >
        {value === "open" && (
          <motion.div
            layoutId="triptype-bg"
            className="absolute inset-0 -z-10 rounded-full bg-charcoal"
            initial={false}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        Open Trip
      </button>
    </div>
  )
}
