"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function JoinCommunitySection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400" />
      
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -top-4 w-24 h-24 rounded-full bg-white/10 blur-xl" />
        <div className="absolute right-1/4 top-1/3 w-32 h-32 rounded-full bg-white/10 blur-xl" />
        <div className="absolute left-1/3 bottom-1/4 w-40 h-40 rounded-full bg-white/10 blur-xl" />
      </div>

      <div className="relative container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Join Our Growing Community
                </h2>
                <p className="text-lg text-gray-600">
                  Join over 1,000 advertisers and promoters who trust AdMinting for their advertising needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="#" 
                    className="transform transition-transform hover:scale-105"
                  >
                    <Image
                      src="/appstore.png"
                      alt="Download on the App Store"
                      width={140}
                      height={42}
                      className="h-[42px] w-auto"
                    />
                  </Link>
                  <Link 
                    href="#" 
                    className="transform transition-transform hover:scale-105"
                  >
                    <Image
                      src="/google.png"
                      alt="Get it on Google Play"
                      width={140}
                      height={42}
                      className="h-[42px] w-auto"
                    />
                  </Link>
                </div>
              </div>
              
              {/* <div className="relative">
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="relative w-full max-w-[375px] mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-[40px] blur-xl opacity-20 animate-pulse" />
                    <Image
                      src="/app-preview.svg"
                      alt="AdMinting App Preview"
                      width={375}
                      height={812}
                      className="relative w-full h-auto rounded-[40px] shadow-2xl"
                      priority
                    />
                  </div>
                </motion.div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-60" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-60" />
              </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
