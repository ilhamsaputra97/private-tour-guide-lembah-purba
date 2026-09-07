export const PRICE = {
  wniAllInOpen: 350000,     // Open Trip, WNI, all-in
  serviceFeeOnly: 318000,   // biaya layanan murni (tanpa tiket), basis WNI Private & basis WNA
  wnaTicket: { weekday: 320000, weekend: 470000 },
  privateGuideFee: 179000,  // flat per rombongan, HANYA untuk Private Trip
  smallGroupCharge: 100000, // < 4 orang, berlaku Private maupun Open
} as const

export function getBasePricePerOrang(nationality: 'wni' | 'wna', tripType: 'private' | 'open', dayType?: 'weekday' | 'weekend') {
  if (nationality === 'wni') {
    // WNI: baik private maupun open pakai basis yang sama (tiket sudah termasuk),
    // yang membedakan cuma privateGuideFee di bawah
    return tripType === 'open' ? PRICE.wniAllInOpen : PRICE.serviceFeeOnly
    // catatan: kalau WNI Private, tiket TNGGP WNI (Rp32K) tetap ditambahkan
    // terpisah supaya adil dibanding open trip all-in - lihat computeTotal
  }
  const ticket = dayType === 'weekend' ? PRICE.wnaTicket.weekend : PRICE.wnaTicket.weekday
  return PRICE.serviceFeeOnly + ticket
}

export function computeTotal(input: {
  jumlah: number
  nationality: 'wni' | 'wna'
  tripType: 'private' | 'open'
  dayType?: 'weekday' | 'weekend'
}) {
  const wniTicket = 32000
  let basePerOrang = getBasePricePerOrang(input.nationality, input.tripType, input.dayType)
  if (input.nationality === 'wni' && input.tripType === 'private') {
    basePerOrang += wniTicket // tiket WNI ditambahkan manual karena base-nya serviceFeeOnly
  }
  const base = basePerOrang * input.jumlah
  const smallGroupCharge = input.jumlah < 4 ? PRICE.smallGroupCharge : 0
  const guideFee = input.tripType === 'private' ? PRICE.privateGuideFee : 0
  return base + smallGroupCharge + guideFee
}
