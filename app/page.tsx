import { Layout } from '@/components/layout'
import { HeroSection } from '@/components/sections/hero'
import { IntroSection } from '@/components/sections/intro'
import { FeaturesSection } from '@/components/sections/features'
import { PartnersSection } from '@/components/sections/partners'
// import { PromoterSpotlightSection } from '@/components/sections/promoter-spotlight'
import { JoinCommunitySection } from '@/components/sections/join-community'
import { FeaturedInSection } from '@/components/sections/featured-in'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <IntroSection />
      <FeaturesSection />
      <PartnersSection />
      {/* <PromoterSpotlightSection /> */}
      <JoinCommunitySection />
      <FeaturedInSection />
      <Footer />
    </Layout>
  )
}
