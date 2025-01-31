"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background/80 to-background">
      <div className="container px-4 md:px-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-3xl blur-3xl" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-card border rounded-2xl px-6 py-12 md:p-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Advertising?
            </h2>
            <p className="mt-4 mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Join thousands of businesses already growing with {"Adminting's"} innovative advertising platform.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg">
                Get Started Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
