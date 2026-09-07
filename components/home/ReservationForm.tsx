"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarIcon, Users, FileText } from "lucide-react"

const reservationSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  whatsapp: z.string().min(9, "Nomor WhatsApp tidak valid"),
  date: z.string().min(1, "Pilih tanggal trekking"),
  jumlah: z.number().min(1).max(30),
  notes: z.string().optional(),
})

export type ReservationFormData = z.infer<typeof reservationSchema>

interface ReservationFormProps {
  jumlah: number
  tripType: "private" | "open"
  onSubmitSuccess: (data: ReservationFormData) => void
}

export function ReservationForm({
  jumlah,
  tripType,
  onSubmitSuccess,
}: ReservationFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      jumlah,
    },
  })

  // Sinkronisasi jumlah dari parent Kalkulator ke form
  useEffect(() => {
    setValue("jumlah", jumlah)
  }, [jumlah, setValue])

  const onSubmit = (data: ReservationFormData) => {
    onSubmitSuccess(data)
  }

  return (
    <div className="rounded-[18px] border border-charcoal/10 bg-white p-5 md:p-8">
      <div className="mb-8">
        <h3 className="text-h3">Form Reservasi</h3>
        <p className="text-body-sm mt-2 text-charcoal/60">
          Lengkapi data untuk mengamankan slot perjalananmu.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Nama */}
        <div>
          <label className="text-body-sm mb-2 block font-semibold">Nama Lengkap</label>
          <input
            {...register("name")}
            type="text"
            placeholder="John Doe"
            className="w-full rounded-[12px] border border-charcoal/15 bg-sand px-4 py-3 outline-none transition-colors focus:border-gold"
          />
          {errors.name && <p className="mt-1 text-[13px] text-red-500">{errors.name.message}</p>}
        </div>

        {/* WhatsApp */}
        <div>
          <label className="text-body-sm mb-2 block font-semibold">Nomor WhatsApp</label>
          <input
            {...register("whatsapp")}
            type="tel"
            placeholder="081234567890"
            className="w-full rounded-[12px] border border-charcoal/15 bg-sand px-4 py-3 outline-none transition-colors focus:border-gold"
          />
          {errors.whatsapp && <p className="mt-1 text-[13px] text-red-500">{errors.whatsapp.message}</p>}
        </div>

        {/* Tanggal & Jumlah (Grid) */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-body-sm mb-2 block font-semibold">Tanggal Trekking</label>
            <div className="relative">
              <input
                {...register("date")}
                type="date"
                className="w-full rounded-[12px] border border-charcoal/15 bg-sand px-4 py-3 pl-11 outline-none transition-colors focus:border-gold"
              />
              <CalendarIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal/40" />
            </div>
            {errors.date && <p className="mt-1 text-[13px] text-red-500">{errors.date.message}</p>}
          </div>

          <div>
            <label className="text-body-sm mb-2 block font-semibold">Jumlah Peserta</label>
            <div className="relative">
              <input
                {...register("jumlah", { valueAsNumber: true })}
                type="number"
                readOnly
                className="w-full rounded-[12px] border border-charcoal/15 bg-sand/50 px-4 py-3 pl-11 outline-none cursor-not-allowed text-charcoal/60"
              />
              <Users className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal/40" />
            </div>
            <p className="mt-1 text-[12px] text-charcoal/40">Diubah dari kalkulator di atas</p>
          </div>
        </div>

        {/* Trip Type Summary (Read-only) */}
        <div className="rounded-[12px] bg-sand p-4 text-[14px]">
          <div className="flex justify-between pb-1">
            <span className="text-charcoal/60">Tipe Trip</span>
            <span className="font-semibold capitalize">{tripType} Trip</span>
          </div>
        </div>

        {/* Catatan */}
        <div>
          <label className="text-body-sm mb-2 block font-semibold">Catatan Tambahan (Opsional)</label>
          <div className="relative">
            <textarea
              {...register("notes")}
              rows={3}
              placeholder="Ada alergi makanan, butuh porter, dll?"
              className="w-full rounded-[12px] border border-charcoal/15 bg-sand px-4 py-3 pl-11 outline-none transition-colors focus:border-gold"
            />
            <FileText className="absolute left-4 top-4 h-5 w-5 text-charcoal/40" />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-full bg-charcoal py-4 text-[15px] font-bold text-sand transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
        >
          {isSubmitting ? "Memproses..." : "Konfirmasi Data & Pilih Pembayaran"}
        </button>
      </form>
    </div>
  )
}
