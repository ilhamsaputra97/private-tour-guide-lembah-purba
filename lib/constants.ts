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

// ── Route Section — 05-PAGE-SPECS.md § Section 5 ──
export const ROUTE_STEPS = [
  {
    step: 1,
    title: 'Basecamp Check-in',
    desc: 'Registrasi, safety briefing, dan cek perlengkapan sebelum masuk kawasan TNGGP.',
    highlight: false,
  },
  {
    step: 2,
    title: 'Situ Gunung Suspension Bridge 243m',
    desc: 'Jembatan gantung terpanjang di Asia Tenggara. View danau Situ Gunung dari ketinggian.',
    highlight: true,
  },
  {
    step: 3,
    title: '8 Jembatan Gantung Ekstrem',
    desc: 'Rangkaian jembatan gantung melintasi lembah dan sungai di tengah hutan hujan tropis.',
    highlight: false,
  },
  {
    step: 4,
    title: 'Susur Sungai & Hutan Lumut',
    desc: 'Trekking menyusuri sungai berbatu, dikelilingi pohon berlumut dan suara alam.',
    highlight: false,
  },
  {
    step: 5,
    title: 'FINISH — Curug Kembar Megah',
    desc: 'Air terjun kembar setinggi 50 meter. Spot makan siang dan istirahat sebelum balik.',
    highlight: true,
  },
] as const

export const ROUTE_BONUS = [
  {
    title: 'Keranjang Sultan',
    desc: 'Spot foto ikonik di atas keranjang bambu raksasa dengan latar belakang hutan.',
  },
  {
    title: 'Jembatan Merah IG',
    desc: 'Jembatan kayu merah yang jadi spot favorit Instagram sepanjang jalur pulang.',
  },
] as const

// ── Safety Section — 05-PAGE-SPECS.md § Section 6 ──
export const SAFETY_CHECKLIST = [
  {
    title: 'Datang Tepat Waktu Sesuai Jadwal Kamu',
    desc: 'Private Trip jadwalnya fleksibel, tapi tetap datang sesuai jam yang sudah disepakati dengan guide.',
    icon: 'Clock' as const,
  },
  {
    title: 'Sepatu Trekking Anti-Selip WAJIB',
    desc: 'Jalur licin dan berbatu. Sandal jepit atau sneakers biasa sangat tidak disarankan.',
    icon: 'Footprints' as const,
  },
  {
    title: 'Baju Ganti + Kamera Waterproof',
    desc: 'Pasti basah di susur sungai. Siapkan baju ganti dan lindungi elektronik dari air.',
    icon: 'Shirt' as const,
  },
  {
    title: 'Persiapan Fisik Ringan & Sarapan',
    desc: 'Rute 7KM butuh stamina. Sarapan cukup dan tidur yang baik sebelum trekking.',
    icon: 'Heart' as const,
  },
] as const

export const SAFETY_WARNING = {
  title: 'Zona Peringatan',
  desc: 'Trek ini melibatkan jembatan gantung, tanjakan curam, dan susur sungai. TIDAK disarankan untuk peserta dengan riwayat penyakit jantung, phobia ketinggian berat, atau kondisi medis serius lainnya. Konsultasikan dengan dokter jika ragu.',
}

// ── FAQ Section — 05-PAGE-SPECS.md § Section 7 ──
export const FAQ_ITEMS = [
  {
    q: 'Apakah cocok untuk pemula yang belum pernah trekking?',
    a: 'Sangat cocok. Rute 7KM ini termasuk kategori ringan-menengah. Dengan Private Trip, guide bisa menyesuaikan pace sesuai kemampuan rombongan kamu.',
  },
  {
    q: 'Apa bedanya Private Trip dan Open Trip?',
    a: 'Private Trip: guide khusus untuk rombongan kamu, jadwal fleksibel, pace disesuaikan. Open Trip: gabung rombongan lain, jadwal fix, harga all-in lebih terjangkau.',
  },
  {
    q: 'Saya takut ketinggian, apakah tetap bisa ikut?',
    a: 'Jembatan gantung adalah bagian utama rute. Kalau phobia ketinggian berat, sangat tidak kami sarankan. Untuk ketakutan ringan, guide akan mendampingi dan memberi instruksi keamanan.',
  },
  {
    q: 'Kalau hujan apakah tetap jalan?',
    a: 'Ya, hujan ringan-sedang tetap jalan — jas hujan sudah termasuk. Kalau hujan deras disertai petir, guide akan menghentikan trekking sementara di shelter terdekat demi keselamatan.',
  },
  {
    q: 'Bagaimana kebijakan refund dan reschedule?',
    a: 'Private Trip punya kebijakan reschedule lebih fleksibel — bisa pindah tanggal hingga H-3 tanpa biaya tambahan. Refund berlaku sesuai ketentuan, dipotong biaya admin. Detail lengkap di halaman Paket.',
  },
  {
    q: 'Berapa minimal orang untuk bisa booking?',
    a: 'Minimal 1 orang. Untuk rombongan di bawah 4 orang, ada charge grup kecil Rp100.000 flat per rombongan, berlaku baik Private maupun Open Trip.',
  },
  {
    q: 'Ada fasilitas apa aja di sepanjang jalur?',
    a: 'Toilet di basecamp dan area Curug Kembar. Shelter berteduh di beberapa titik. Makan siang nasi liwet disajikan di area finish. Air mineral tersedia di basecamp dan sepanjang rute.',
  },
  {
    q: 'Boleh bawa anak kecil?',
    a: 'Usia minimal yang kami sarankan 7 tahun dengan kondisi fisik baik. Dengan Private Trip, guide bisa extra perhatian ke anak-anak dan pace lebih santai.',
  },
  {
    q: 'Bedanya bayar Private Trip vs Open Trip gimana?',
    a: 'Private Trip ada tambahan biaya guide privat flat Rp179.000 per rombongan (bukan per orang), di luar harga tiket dan layanan per orang. Open Trip nggak ada biaya tambahan ini.',
  },
  {
    q: 'Pembayarannya aman nggak? Metode apa aja?',
    a: 'Aman, kami pakai Midtrans — payment gateway resmi yang juga dipakai e-commerce besar di Indonesia. Bisa bayar QRIS, transfer virtual account, atau kartu debit/kredit. Kamu bisa pilih bayar DP 30% dulu atau langsung lunas.',
  },
] as const
