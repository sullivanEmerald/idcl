"use client"

import Image from 'next/image'

const mediaPartners = [
  {
    name: 'Techpoint',
    logo: '/techp.png'
  },
  {
    name: 'The Guardian',
    logo: '/guardian.png'
  },
  {
    name: 'TechCrunch',
    logo: '/tc.png'
  }
]

export function FeaturedInSection() {
  return (
    <section className="py-12 bg-gray-50/50">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-8">
            <h2 className="text-2xl font-semibold text-center text-gray-900">
              As featured in
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {mediaPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="relative w-32 h-8 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
