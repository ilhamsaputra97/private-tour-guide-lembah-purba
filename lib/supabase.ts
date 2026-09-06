// lib/supabase.ts
// Supabase client — booking & status transaksi
// Referensi: 09-MIDTRANS-PAYMENT.md
// TODO: Isi di prompt berikutnya

import { createClient } from '@supabase/supabase-js'

// Client-side (anon key, dipakai di browser)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
)

// Server-side (service role key, hanya dipakai di API routes)
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  )
}
