export const PRICE = {
  ticketPerOrang: 350000,   // flat, per orang, sudah termasuk tiket masuk TNGGP — berlaku Private maupun Open
  privateGuideFee: 300000,  // flat per rombongan, HANYA untuk Private Trip
  smallGroupCharge: 100000, // < 4 orang, berlaku Private maupun Open
} as const

export function computeTotal(input: {
  jumlah: number
  tripType: 'private' | 'open'
}) {
  const base = PRICE.ticketPerOrang * input.jumlah
  const smallGroupCharge = input.tripType === 'private' && input.jumlah < 4 ? PRICE.smallGroupCharge : 0
  const guideFee = input.tripType === 'private' ? PRICE.privateGuideFee : 0
  return base + smallGroupCharge + guideFee
}
