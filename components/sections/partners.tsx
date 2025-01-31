"use client"

import Image from 'next/image'

const partners = [
  {
    name: 'Yellow Card',
    logo: '/yc.png'
  },
  {
    name: 'KongaTV',
    logo: '/konga.png'
  },
  {
    name: 'SKILLUP',
    logo: '/sui.png'
  },
  {
    name: 'Koyn',
    logo: '/koyn.png'
  },
  {
    name: 'MOZZART',
    logo: '/mozz.png'
  },
  {
    name: 'LiveScoreBet',
    logo: '/lsb.png'
  },
  {
    name: 'Kwik',
    logo: '/kwik.png'
  }
]

export function PartnersSection() {
  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">OUR PARTNERS</h2>
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          {/* Scrolling Container */}
          <div className="overflow-hidden relative">
            <div className="flex space-x-12 animate-scroll">
              {/* First set of partners */}
              {partners.map((partner) => (
                <div key={partner.name} className="flex-shrink-0 w-32 h-12 relative">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner) => (
                <div key={`${partner.name}-duplicate`} className="flex-shrink-0 w-32 h-12 relative">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain hover:scale-110 transition-transform duration-300"
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
