// lib/constants.ts
// Konstanta global project Rimba Awal Expedition

export const SITE_NAME = 'Rimba Awal Expedition'
export const SITE_DESCRIPTION = 'Trekking privat dengan guide khusus rombongan kamu. Rute sendiri, pace sendiri, di jantung hutan TNGGP, Situ Gunung Sukabumi.'

// ── Private Guide Spotlight — 06-COMPONENTS.md § Content Source ──
export const PRIVATE_GUIDE_FEATURES = [
  {
    title: 'Guide Dedicated',
    desc: 'Satu guide fokus ke rombongan kamu doang, bukan dibagi ke peserta open trip lain.',
    icon: 'UserCog' as const,
  },
  {
    title: 'Jadwal Fleksibel',
    desc: 'Bisa mulai lebih pagi atau lebih siang, nyesuaiin kebutuhan rombongan, bukan jam fix open trip.',
    icon: 'CalendarClock' as const,
  },
  {
    title: 'Pace Sesuai Kemampuan',
    desc: 'Ada lansia atau anak kecil di rombongan? Guide nyesuaiin kecepatan jalan, nggak maksa ngejar rombongan lain.',
    icon: 'Route' as const,
  },
  {
    title: 'Privasi Momen',
    desc: 'Cocok buat family trip, gathering kantor kecil, atau momen khusus tanpa keramaian rombongan asing.',
    icon: 'Users2' as const,
  },
] as const

// ── Why Section — 05-PAGE-SPECS.md § Section 3 ──
export const WHY_CARDS = [
  {
    title: 'Pohon Rasamala Raksasa',
    desc: 'Diameter lebih dari 2 meter, usianya ratusan tahun, jadi kanopi alami sepanjang rute kamu.',
    icon: 'TreePine' as const,
  },
  {
    title: 'Udara Sejuk Pegunungan',
    desc: 'Kelembapan tinggi, oksigen bersih — jarang kamu temukan di kota.',
    icon: 'Wind' as const,
  },
  {
    title: 'Ekosistem Terjaga',
    desc: 'Rumah bagi Owa Jawa, Surili, dan elang jawa. Kita tamu di sini.',
    icon: 'Leaf' as const,
  },
] as const

// ── Package Comparison — 05-PAGE-SPECS.md § Section 4 ──
export const PRIVATE_PACKAGE = {
  variant: 'private' as const,
  title: 'Private Trip',
  price: 'mulai Rp318K/orang + Rp179K/rombongan',
  badge: 'RECOMMENDED',
  ctaLabel: 'Pilih Private Trip',
  featured: true,
  inclusions: [
    'Tiket Masuk TNGGP Resmi (WNI, sudah termasuk)',
    'Guide privat khusus rombongan kamu (bukan dibagi)',
    'Jadwal keberangkatan fleksibel (nego jam mulai)',
    'Safety Harness Standar Internasional',
    'Makan Siang Nasi Liwet + Air Mineral',
    'Jas Hujan',
  ],
}

export const OPEN_PACKAGE = {
  variant: 'open' as const,
  title: 'Open Trip',
  price: 'Rp350K/orang all-in',
  badge: 'HEMAT',
  ctaLabel: 'Pilih Open Trip',
  featured: false,
  inclusions: [
    'Tiket Masuk TNGGP Resmi',
    'Welcome Drink + Singkong Rebus',
    'Local Guide bersertifikat (dibagi rombongan gabungan)',
    'Safety Harness Standar Internasional',
    'Makan Siang Nasi Liwet + Air Mineral',
    'Jas Hujan',
  ],
}
