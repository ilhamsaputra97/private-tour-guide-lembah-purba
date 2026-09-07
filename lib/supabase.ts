import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client untuk pemakaian client-side (dengan anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client untuk pemakaian server-side SAJA (dengan service role key)
// BUKAN untuk diekspor dan dipakai di komponen client!
export const getSupabaseAdmin = () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable")
  }
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY)
}
