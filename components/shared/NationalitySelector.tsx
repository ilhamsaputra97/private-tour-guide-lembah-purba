"use client"

import { cn } from "@/lib/utils"

interface NationalitySelectorProps {
  value: "wni" | "wna"
  onChange: (value: "wni" | "wna") => void
}

export function NationalitySelector({ value, onChange }: NationalitySelectorProps) {
  return (
    <div className="flex gap-4">
      <label className="flex cursor-pointer items-center gap-2">
        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
            value === "wni" ? "border-gold bg-gold" : "border-charcoal/20"
          )}
        >
          {value === "wni" && <div className="h-2 w-2 rounded-full bg-white" />}
        </div>
        <input
          type="radio"
          name="nationality"
          value="wni"
          checked={value === "wni"}
          onChange={() => onChange("wni")}
          className="hidden"
        />
        <span className={cn("text-body-sm font-semibold", value === "wni" ? "text-charcoal" : "text-charcoal/60")}>
          WNI
        </span>
      </label>

      <label className="flex cursor-pointer items-center gap-2">
        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
            value === "wna" ? "border-gold bg-gold" : "border-charcoal/20"
          )}
        >
          {value === "wna" && <div className="h-2 w-2 rounded-full bg-white" />}
        </div>
        <input
          type="radio"
          name="nationality"
          value="wna"
          checked={value === "wna"}
          onChange={() => onChange("wna")}
          className="hidden"
        />
        <span className={cn("text-body-sm font-semibold", value === "wna" ? "text-charcoal" : "text-charcoal/60")}>
          WNA
        </span>
      </label>
    </div>
  )
}
