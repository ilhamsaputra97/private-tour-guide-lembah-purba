"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ButtonRA } from "@/components/shared/ButtonRA"
import { Label } from "@/components/ui/label"

export function GuestCheckModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return
    
    setLoading(true)
    setErrorMsg("")
    
    try {
      const res = await fetch("/api/guest/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengirim OTP")
      }
      
      setStep(2)
    } catch (err: any) {
      setErrorMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) return
    
    setLoading(true)
    setErrorMsg("")
    
    try {
      const res = await fetch("/api/guest/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Gagal verifikasi OTP")
      }
      
      // Simpan data asli ke sessionStorage
      sessionStorage.setItem("guest_booking_data", JSON.stringify(data.data))
      
      setOpen(false)
      setTimeout(() => {
        setStep(1)
        setOtp("")
        setName("")
        setEmail("")
        setErrorMsg("")
      }, 300)
      router.push(`/status-pesanan`)
    } catch (err: any) {
      setErrorMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val)
        if (!val) {
          setTimeout(() => {
            setStep(1)
            setOtp("")
            setName("")
            setEmail("")
            setErrorMsg("")
          }, 300)
        }
      }}
    >
      <DialogTrigger render={<button type="button" className="inline-block" />}>
        {children}
      </DialogTrigger>

      <DialogContent className="bg-sand border-charcoal/10 rounded-[14px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-display text-charcoal text-2xl tracking-tight">
            {step === 1 ? "Cek Status Pesanan" : "Verifikasi OTP"}
          </DialogTitle>
          <DialogDescription className="text-charcoal/70">
            {step === 1
              ? "Masukkan nama dan alamat email yang Anda gunakan saat pemesanan."
              : `Kami telah mengirimkan 6 digit kode ke email Anda (${email}).`
            }
          </DialogDescription>
        </DialogHeader>

        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm">
            {errorMsg}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-charcoal font-medium">Nama lengkap saat isi form pemesanan</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Misal: Budi Santoso"
                className="border-charcoal/20 focus:border-gold focus:ring-gold bg-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-charcoal font-medium">Alamat Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="border-charcoal/20 focus:border-gold focus:ring-gold bg-white"
                required
              />
            </div>
            <div className="pt-2">
              <ButtonRA type="submit" variant="primary" className="w-full justify-center" disabled={loading}>
                {loading ? "Mengirim..." : "Kirim Kode OTP"}
              </ButtonRA>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-charcoal font-medium">Kode OTP (6 digit)</Label>
              <Input
                id="otp"
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Misal: 123456"
                className="border-charcoal/20 focus:border-gold focus:ring-gold bg-white font-mono tracking-[0.3em] text-center text-lg"
                required
              />
            </div>
            <div className="pt-2">
              <ButtonRA type="submit" variant="primary" className="w-full justify-center" disabled={loading}>
                {loading ? "Memverifikasi..." : "Verifikasi & Lihat Pesanan"}
              </ButtonRA>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setStep(1)
                  setErrorMsg("")
                }}
                className="text-sm text-charcoal/60 hover:text-charcoal underline"
              >
                Kembali ke pengisian email
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
