// app/page.tsx
// Homepage — Rimba Awal Expedition
// Section 1: HeroSection, Section 2: PrivateGuideSpotlight,
// Section 3: WhySection, Section 4: PackageComparisonSection

import {
  HeroSection,
  PrivateGuideSpotlight,
  WhySection,
  PackageComparisonSection,
} from "@/components/home"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PrivateGuideSpotlight />
      <WhySection />
      <PackageComparisonSection />
    </main>
  )
}
