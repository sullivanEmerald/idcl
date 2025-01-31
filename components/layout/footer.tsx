"use client"

import Image from 'next/image'
import Link from 'next/link'
import { YoutubeIcon, FacebookIcon, TikTokIcon, InstagramIcon, LinkedInIcon } from '@/components/ui/social-icons'

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Blog', href: '/blog' }, 
  { name: 'Calculator', href: '/calculator' }
]

const legalLinks = [
  { name: 'Terms', href: '/terms' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Community', href: '/community' }
]

type SocialIcon = React.ComponentType<{ className?: string }>

interface SocialLink {
  name: string
  icon: SocialIcon
  href: string
}

const socialLinks: SocialLink[] = [
  { name: 'YouTube', icon: YoutubeIcon, href: '#' },
  { name: 'Facebook', icon: FacebookIcon, href: '#' },
  { name: 'TikTok', icon: TikTokIcon, href: '#' },
  { name: 'Instagram', icon: InstagramIcon, href: '#' },
  { name: 'LinkedIn', icon: LinkedInIcon, href: '#' }
]

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <Image
              src="/logo.svg"
              alt="AdMinting"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <p className="text-sm text-gray-600 max-w-xs">
              AdMinting is a market place for advertisers and an aggregator of NICHED digital communities and influencers
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Address 1: Umuori Umutobeche Uratta</p>
              <p>Address 2: 28 Egbu Road, Owerri</p>
              <p>mintizers@gmail.com or admin@adminting.com</p>
              <p>+2349165475190 or +2347080232031</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
          <p>2025 - AdMinting Ltd - RC: 7555686</p>
        </div>
      </div>
    </footer>
  )
}
