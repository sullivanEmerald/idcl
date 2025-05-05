"use client"

import { motion } from 'framer-motion'

const UserCircle = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="url(#paint0_linear)" />
    <path
      d="M20 10C17.2386 10 15 12.2386 15 15C15 17.7614 17.2386 20 20 20C22.7614 20 25 17.7614 25 15C25 12.2386 22.7614 10 20 10ZM20 25C15.0294 25 11 27.0294 11 29.5V30H29V29.5C29 27.0294 24.9706 25 20 25Z"
      fill="white"
    />
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0066FF" />
        <stop offset="1" stopColor="#4D9AFF" />
      </linearGradient>
    </defs>
  </svg>
)

export function TrustIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex items-center gap-6 text-sm"
    >
      <div className="flex items-center gap-3">
        {/* <div className="relative flex -space-x-4">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * i }}
              className="relative"
              style={{ zIndex: 4 - i }}
            >
              <div className="rounded-full border-2 border-background bg-gradient-to-br from-primary/80 to-blue-600/80 p-[2px]">
                <UserCircle />
              </div>
            </motion.div>
          ))}
        </div> */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
            >
              1,000+
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-muted-foreground"
            >
              advertisers
            </motion.span>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-muted-foreground"
          >
            trust our platform
          </motion.span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1 }}
        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 2L12.2451 7.90983H18.5106L13.4327 11.6803L15.6779 17.5902L10 13.8197L4.32215 17.5902L6.56726 11.6803L1.48944 7.90983H7.75486L10 2Z"
            fill="url(#paint1_linear)"
          />
          <defs>
            <linearGradient id="paint1_linear" x1="1.48944" y1="2" x2="18.5106" y2="17.5902" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0066FF" />
              <stop offset="1" stopColor="#4D9AFF" />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-xs font-medium">Trusted by top brands</span>
      </motion.div>
    </motion.div>
  )
}
