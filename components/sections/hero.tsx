"use client"

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { TrustIndicator } from '../ui/trust-indicator'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

export function HeroSection() {
  const router = useRouter()
  const { user } = useAuth()

  const handleGetStarted = () => {
    if (user) {
      // If user is already logged in, redirect to their dashboard
      const dashboardPath = user.role === 'advertiser'
        ? '/advertiser/dashboard'
        : '/promoter/dashboard'
      router.push(dashboardPath)
    } else {
      // If not logged in, go to login page
      router.push('/auth/login')
    }
  }

  const handleLearnMore = () => {
    // router.push('/about')
  }
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden bg-gradient-to-b from-background to-background/80">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] -z-[1]" />
      <div className="absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-[1]" />
      
      <div className="container relative z-10 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 relative z-20"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
              >
                🚀 Your Community Based Advertising
                <span className="ml-2 rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  New Platform
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
              >
                Revolutionize Your Digital Advertising
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="max-w-[600px] text-muted-foreground text-lg sm:text-xl"
              >
                We are a marketplace for advertisers and an aggregator of niched online communities and digital Promoters,
                enabling targeted, authentic, and cost-effective advertising campaigns.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-blue-600 text-white hover:opacity-90"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </motion.div>

            <TrustIndicator />
          </motion.div>

          {/* Right side - Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative lg:ml-auto z-20"
          >
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary rounded-full blur-3xl opacity-20 animate-pulse" />
              <div className="relative bg-gradient-to-b from-background to-background/5 rounded-3xl border backdrop-blur-sm p-4">
                <Image
                  src="/hero-img.png"
                  alt="Platform Preview"
                  width={600}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                  priority
                />
                
                {/* Floating elements */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -top-4 -left-4 bg-background rounded-lg shadow-lg p-4 border"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium">Live Campaigns</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute -bottom-4 -right-4 bg-background rounded-lg shadow-lg p-4 border"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📈</span>
                    <span className="text-sm font-medium">Real-time Analytics</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
