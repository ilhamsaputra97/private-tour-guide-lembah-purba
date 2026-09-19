"use client"

import { Toaster as Sonner, toast as sonnerToast } from "sonner"
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="bottom-right"
      className="toaster group"
      toastOptions={{
        style: {
          fontFamily: "var(--font-inter), sans-serif",
          borderRadius: "12px",
          padding: "14px 16px",
          fontSize: "14px",
          lineHeight: "1.5",
          boxShadow: "0 8px 30px rgba(14, 22, 19, 0.12)",
        },
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#1B2622] group-[.toaster]:text-[#F7F3EA] group-[.toaster]:border-[#28362F]",
          description: "group-[.toast]:text-[#F7F3EA]/70",
          actionButton:
            "group-[.toast]:bg-[#C8A24A] group-[.toast]:text-[#1B2622] group-[.toast]:font-semibold",
          cancelButton:
            "group-[.toast]:bg-[#28362F] group-[.toast]:text-[#F7F3EA]",
        },
      }}
      icons={{
        success: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
        error: <XCircle className="h-5 w-5 text-red-400" />,
        warning: <AlertTriangle className="h-5 w-5 text-[#C8A24A]" />,
        info: <Info className="h-5 w-5 text-[#C8A24A]" />,
      }}
      {...props}
    />
  )
}

export { Toaster }
