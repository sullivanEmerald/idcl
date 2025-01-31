"use client"

import Image from 'next/image'

export function PromoterSpotlightSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Meet Our Promoter of the Month</h2>
              <p className="text-muted-foreground">
                Every month, we shine a spotlight on one of our top promoters, asking them about their experiences and how AdMinting has helped them grow.
              </p>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/promo.png"
                  alt="Hardid Malaikee"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 right-0 bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h4 className="font-semibold mb-2">Promoter Spotlight</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  &quot;AdMinting has revolutionized the way I approach digital promotion. Their tools and community support have helped me achieve my goals faster than I ever thought possible.&quot;
                </p>
                <p className="text-sm font-medium">-Hardid Malaikee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
