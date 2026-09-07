"use client"

import { cn } from "@/lib/utils"

interface DayTypeSelectorProps {
  value: "weekday" | "weekend"
  onChange: (value: "weekday" | "weekend") => void
}

export function DayTypeSelector({ value, onChange }: DayTypeSelectorProps) {
  return (
    <div className="mt-3 flex gap-4 rounded-[12px] bg-sand p-3 border border-charcoal/5">
      <label className="flex cursor-pointer items-center gap-2">
        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
            value === "weekday" ? "border-gold bg-gold" : "border-charcoal/20"
          )}
        >
          {value === "weekday" && <div className="h-2 w-2 rounded-full bg-white" />}
        </div>
        <input
          type="radio"
          name="dayType"
          value="weekday"
          checked={value === "weekday"}
          onChange={() => onChange("weekday")}
          className="hidden"
        />
        <span className={cn("text-body-sm font-semibold", value === "weekday" ? "text-charcoal" : "text-charcoal/60")}>
          Hari Kerja
        </span>
      </label>

      <label className="flex cursor-pointer items-center gap-2">
        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
            value === "weekend" ? "border-gold bg-gold" : "border-charcoal/20"
          )}
        >
          {value === "weekend" && <div className="h-2 w-2 rounded-full bg-white" />}
        </div>
        <input
          type="radio"
          name="dayType"
          value="weekend"
          checked={value === "weekend"}
          onChange={() => onChange("weekend")}
          className="hidden"
        />
        <span className={cn("text-body-sm font-semibold", value === "weekend" ? "text-charcoal" : "text-charcoal/60")}>
          Akhir Pekan / Libur
        </span>
      </label>
    </div>
  )
}
