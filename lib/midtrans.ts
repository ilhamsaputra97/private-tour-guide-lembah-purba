// lib/midtrans.ts
// Server-side Midtrans client — generate Snap Token
// Referensi: 09-MIDTRANS-PAYMENT.md
// HANYA dipakai di API routes, JANGAN import di client
// TODO: Isi di prompt berikutnya

// eslint-disable-next-line @typescript-eslint/no-require-imports
const midtransClient = require('midtrans-client')

export const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
  serverKey: process.env.MIDTRANS_SERVER_KEY ?? '',
})
