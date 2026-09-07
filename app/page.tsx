// app/page.tsx
// Homepage — Rimba Awal Expedition
// Sections 1-9: Hero, Spotlight, Why, Package, Route, Safety, FAQ, Booking

import {
  HeroSection,
  PrivateGuideSpotlight,
  WhySection,
  PackageComparisonSection,
  RouteSection,
  SafetySection,
  FAQSection,
  BookingSection,
} from "@/components/home"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PrivateGuideSpotlight />
      <WhySection />
      <PackageComparisonSection />
      <RouteSection />
      <SafetySection />
      <FAQSection />
      <BookingSection />
    </main>
  )
}
