// app/page.tsx
// Homepage — Rimba Awal Expedition
// Sections 1-7: Hero, Spotlight, Why, Package, Route, Safety, FAQ

import {
  HeroSection,
  PrivateGuideSpotlight,
  WhySection,
  PackageComparisonSection,
  RouteSection,
  SafetySection,
  FAQSection,
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
    </main>
  )
}
