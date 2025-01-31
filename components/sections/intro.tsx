"use client"

import { motion } from 'framer-motion'

export function IntroSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background/80 to-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
          >
            The Future of Advertising Starts Here
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
          >
            Adminting seamlessly connects advertisers with niche digital promoters,
            empowering businesses to achieve their advertising goals with ease.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
