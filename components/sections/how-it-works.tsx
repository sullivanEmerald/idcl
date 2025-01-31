"use client"

import { motion } from 'framer-motion'

const steps = [
  {
    number: "01",
    title: "Create Your Campaign",
    description: "Define your campaign goals, target audience, and budget. Our intuitive interface makes it simple to set up your first campaign.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5L25 15H35L27 22L30 32L20 26L10 32L13 22L5 15H15L20 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    number: "02",
    title: "Connect with Promoters",
    description: "Browse our network of verified digital promoters. Filter by niche, audience size, and performance metrics to find your perfect match.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 13.3333C30 16.6667 26.6667 20 20 20C13.3333 20 10 16.6667 10 13.3333C10 10 14 6.66667 20 6.66667C26 6.66667 30 10 30 13.3333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 25C26.6667 25 33.3333 27 35 31.6667H5C6.66667 27 13.3333 25 20 25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    number: "03",
    title: "Launch & Monitor",
    description: "Watch your campaign take off. Track performance in real-time with our advanced analytics dashboard.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 13.3333V20L25 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  }
]

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Get started with Adminting in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 text-6xl font-bold text-primary/10">
                {step.number}
              </div>
              <div className="relative z-10 bg-card hover:bg-muted/50 border rounded-2xl p-6 h-full transition-colors">
                <div className="text-primary mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
