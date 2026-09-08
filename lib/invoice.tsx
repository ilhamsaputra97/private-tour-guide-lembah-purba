import React from 'react'
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from '@react-pdf/renderer'
import { INVOICE_COLORS } from './invoice-colors'
import './invoice-fonts'
import { getSupabaseAdmin } from '@/lib/supabase'


export type BookingRow = {
  id: string
  order_id: string
  nama: string
  wa_number: string
  tanggal_trekking: string
  jumlah_orang: number
  trip_type: 'private' | 'open'
  catatan: string | null
  total_estimasi: number
  payment_option: 'dp' | 'full'
  amount_to_pay: number
  payment_status: 'pending' | 'settlement' | 'expire' | 'cancel' | 'deny'
  midtrans_transaction_id: string | null
  created_at: string
  updated_at: string
  invoice_url: string | null
  guide_name: string | null
}

const styles = StyleSheet.create({
  page: { backgroundColor: INVOICE_COLORS.sand, padding: 40, fontFamily: 'Inter' },
  headerBar: { backgroundColor: INVOICE_COLORS.charcoal, padding: 20, borderRadius: 6, marginBottom: 20 },
  brand: { fontFamily: 'Fraunces', fontSize: 24, fontWeight: 600, color: INVOICE_COLORS.sand },
  brandSub: { fontFamily: 'Inter', fontSize: 10, color: 'rgba(247,243,234,0.7)', marginTop: 8 },

  infoSection: { marginBottom: 20, borderBottomWidth: 1, borderBottomColor: INVOICE_COLORS.gold, paddingBottom: 16 },
  infoRow: { flexDirection: 'row', marginBottom: 4 },
  infoLabel: { width: 120, fontFamily: 'Inter', fontSize: 9, color: INVOICE_COLORS.inkMuted },
  infoValue: { fontFamily: 'Courier', fontSize: 10, color: INVOICE_COLORS.charcoal },
  infoBadge: { backgroundColor: '#10B981', color: '#fff', fontSize: 9, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontFamily: 'Inter', fontWeight: 600 },

  billToLabel: { fontFamily: 'Inter', fontSize: 9, fontWeight: 600, letterSpacing: 1, color: INVOICE_COLORS.inkMuted, marginBottom: 8 },
  billToText: { fontFamily: 'Inter', fontSize: 11, color: INVOICE_COLORS.charcoal, marginBottom: 2 },

  detailsSection: { marginTop: 24, marginBottom: 24 },
  sectionTitle: { fontFamily: 'Inter', fontSize: 9, fontWeight: 600, letterSpacing: 1, color: INVOICE_COLORS.inkMuted, marginBottom: 12 },
  detailRow: { flexDirection: 'row', marginBottom: 6 },
  detailLabel: { width: 150, fontFamily: 'Inter', fontSize: 10, color: INVOICE_COLORS.charcoal },
  detailValue: { fontFamily: 'Inter', fontSize: 10, color: INVOICE_COLORS.charcoal },

  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  breakdownLabel: { fontFamily: 'Inter', fontSize: 10, color: INVOICE_COLORS.charcoal },
  breakdownValue: { fontFamily: 'Courier', fontSize: 10, color: INVOICE_COLORS.charcoal },

  totalDivider: { borderBottomWidth: 1.5, borderBottomColor: INVOICE_COLORS.gold, marginVertical: 12 },

  totalBlock: { backgroundColor: INVOICE_COLORS.charcoal, padding: 16, borderRadius: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  totalLabel: { fontFamily: 'Inter', fontSize: 9, fontWeight: 600, letterSpacing: 1, color: 'rgba(200,162,74,0.7)', marginBottom: 4 },
  totalValue: { fontFamily: 'Fraunces', fontSize: 20, fontWeight: 600, color: INVOICE_COLORS.sand },
  totalRightValue: { fontFamily: 'Courier', fontSize: 11, color: INVOICE_COLORS.sand },
  totalRightLabel: { fontFamily: 'Inter', fontSize: 10, color: 'rgba(247,243,234,0.45)', marginRight: 12 },
  totalRightRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 4 },

  signatureRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, marginBottom: 20 },
  signatureBlock: { width: '45%', alignItems: 'center' },
  signatureName: { fontFamily: 'Fraunces', fontSize: 26, fontWeight: 600, color: INVOICE_COLORS.charcoal, marginBottom: 6 },
  signatureLine: { width: '100%', borderBottomWidth: 1, borderBottomColor: 'rgba(27,38,34,0.3)', marginBottom: 4 },
  signatureFullName: { fontFamily: 'Inter', fontSize: 9, color: INVOICE_COLORS.inkMuted },

  footer: { marginTop: 'auto', borderTopWidth: 1, borderTopColor: 'rgba(27,38,34,0.1)', paddingTop: 16 },
  footerText: { fontFamily: 'Inter', fontSize: 9, color: INVOICE_COLORS.inkMuted, marginBottom: 4 },
  footerOrderId: { fontFamily: 'Courier', fontSize: 8, color: INVOICE_COLORS.inkMuted },
})

function getFirstName(fullName: string) {
  if (!fullName) return ''
  return fullName.trim().split(/\s+/)[0]
}

export function InvoiceDocument({ booking }: { booking: BookingRow }) {
  // Use booking values to reconstruct the calculation exactly
  // Note: We don't use computeTotal to avoid discrepancies, we use what's in the DB.
  // The base price in the system is Rp350.000 per person
  const ticketBase = 350000
  const totalTicket = ticketBase * booking.jumlah_orang

  // Back-calculate the other fees based on tripType and total_estimasi
  const guideFee = booking.trip_type === 'private' ? 300000 : 0
  const smallGroupCharge = (booking.trip_type === 'private' && booking.jumlah_orang < 4) ? 100000 : 0

  const sisaBayar = booking.total_estimasi - booking.amount_to_pay

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBar}>
          <Text style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 9, letterSpacing: 1, color: 'rgba(200,162,74,0.7)', marginBottom: 8 }}>INVOICE</Text>
          <Text style={styles.brand}>Lembah Purba{'\n'}<Text style={{ color: INVOICE_COLORS.gold }}>Expedition</Text></Text>
          <Text style={styles.brandSub}>Situ Gunung, Sukabumi</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>No. Invoice</Text>
            <Text style={styles.infoValue}>: INV-{booking.order_id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tanggal Bayar</Text>
            <Text style={styles.infoValue}>: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.infoValue}>: </Text>
              <Text style={styles.infoBadge}>LUNAS</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.billToLabel}>DITAGIHKAN KEPADA</Text>
          <Text style={styles.billToText}>{booking.nama}</Text>
          <Text style={styles.billToText}>{booking.wa_number}</Text>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>RINCIAN TRIP</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Trip Type</Text>
            <View style={{ backgroundColor: booking.trip_type === 'private' ? 'rgba(200,162,74,0.12)' : 'rgba(27,38,34,0.07)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 2 }}>
              <Text style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 9, color: booking.trip_type === 'private' ? '#9A7530' : 'rgba(27,38,34,0.6)' }}>
                {booking.trip_type === 'private' ? 'Private Trip' : 'Open Trip'}
              </Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tanggal Trekking</Text>
            <Text style={styles.detailValue}>: {new Date(booking.tanggal_trekking).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Jumlah Orang</Text>
            <Text style={styles.detailValue}>: {booking.jumlah_orang} Orang</Text>
          </View>
        </View>

        <View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Tiket TNGGP + Tiket Ekspedisi ({booking.jumlah_orang} x Rp350.000)</Text>
            <Text style={styles.breakdownValue}>Rp{totalTicket.toLocaleString('id-ID')}</Text>
          </View>

          {guideFee > 0 && (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Biaya Private Guide (flat)</Text>
              <Text style={styles.breakdownValue}>Rp{guideFee.toLocaleString('id-ID')}</Text>
            </View>
          )}

          {smallGroupCharge > 0 && (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Charge grup kecil</Text>
              <Text style={styles.breakdownValue}>Rp{smallGroupCharge.toLocaleString('id-ID')}</Text>
            </View>
          )}

          <View style={styles.totalBlock}>
            <View>
              <Text style={styles.totalLabel}>TOTAL ESTIMASI</Text>
              <Text style={styles.totalValue}>Rp{booking.total_estimasi.toLocaleString('id-ID')}</Text>
            </View>
            <View>
              <View style={styles.totalRightRow}>
                <Text style={styles.totalRightLabel}>{booking.payment_option === 'dp' ? 'DP 30%' : 'Lunas'}</Text>
                <Text style={styles.totalRightValue}>Rp{booking.amount_to_pay.toLocaleString('id-ID')}</Text>
              </View>
              {sisaBayar > 0 ? (
                <View style={styles.totalRightRow}>
                  <Text style={styles.totalRightLabel}>Sisa</Text>
                  <Text style={[styles.totalRightValue, { color: INVOICE_COLORS.gold }]}>Rp{sisaBayar.toLocaleString('id-ID')}</Text>
                </View>
              ) : (
                <View style={styles.totalRightRow}>
                  <Text style={[styles.totalRightLabel, { color: '#10b981', marginRight: 0 }]}>✓ Lunas</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.signatureRow}>
          <View style={styles.signatureBlock}>
            <Text style={styles.sectionTitle}>GUIDE PENDAMPING</Text>
            <Text style={styles.signatureName}>
              {booking.guide_name ? getFirstName(booking.guide_name) : ' '}
            </Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureFullName}>{booking.guide_name ?? ''}</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.sectionTitle}>PEMESAN</Text>
            <Text style={styles.signatureName}>{getFirstName(booking.nama)}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureFullName}>{booking.nama}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Dibayar via Midtrans · {booking.payment_option === 'dp' ? 'DP' : 'Full Payment'}</Text>
          <Text style={styles.footerOrderId}>Order ID: {booking.order_id}</Text>
        </View>
      </Page>
    </Document>
  )
}

export async function generateAndStoreInvoice(booking: BookingRow) {
  const buffer = await renderToBuffer(<InvoiceDocument booking={booking} />)
  const fileName = `invoice-${booking.order_id}.pdf`

  const supabaseAdmin = getSupabaseAdmin()

  const { data, error } = await supabaseAdmin.storage
    .from('invoices')
    .upload(fileName, buffer, { contentType: 'application/pdf', upsert: true })

  if (error) throw error

  const { data: publicUrlData } = supabaseAdmin.storage.from('invoices').getPublicUrl(fileName)
  return publicUrlData.publicUrl
}
