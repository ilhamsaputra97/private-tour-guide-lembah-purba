// lib/supabase.ts
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

// Client untuk pemakaian client-side (dengan publishable key)
export const supabase = createClient(supabaseUrl, supabasePublishableKey)

// Client untuk pemakaian server-side SAJA (dengan secret key)
// BUKAN untuk diekspor dan dipakai di komponen client!
export const getSupabaseAdmin = () => {
  if (!process.env.SUPABASE_SECRET_KEY) {
    throw new Error("Missing SUPABASE_SECRET_KEY environment variable")
  }
  return createClient(supabaseUrl, process.env.SUPABASE_SECRET_KEY)
}