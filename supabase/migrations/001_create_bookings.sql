create table bookings (
  id uuid primary key default gen_random_uuid(),
  order_id text unique not null,          -- dipakai sebagai Midtrans order_id juga
  nama text not null,
  wa_number text not null,
  tanggal_trekking date not null,
  jumlah_orang int not null,
  trip_type text not null check (trip_type in ('private', 'open')),
  nationality text not null check (nationality in ('wni', 'wna')),
  day_type text check (day_type in ('weekday', 'weekend')),
  catatan text,
  total_estimasi bigint not null,         -- total penuh dari kalkulator
  payment_option text not null check (payment_option in ('dp', 'full')),
  amount_to_pay bigint not null,          -- nominal yang benar-benar ditagih Midtrans
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'settlement', 'expire', 'cancel', 'deny')),
  midtrans_transaction_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table bookings enable row level security;
-- Insert hanya lewat server (service role key), tidak ada public insert policy
-- Select status by order_id boleh public read terbatas (untuk halaman /booking/sukses)
create policy "Public can read own booking by order_id"
  on bookings for select using (true);
