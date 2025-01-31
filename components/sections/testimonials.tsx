"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    quote: "Adminting has transformed how we approach digital advertising. The results have been phenomenal.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechStart Inc.",
    avatar: "/avatars/avatar-1.png"
  },
  {
    quote: "The platform's ease of use and transparent tracking make it a game-changer for our campaigns.",
    author: "Michael Chen",
    role: "Growth Lead",
    company: "Scale Digital",
    avatar: "/avatars/avatar-2.png"
  },
  {
    quote: "We've seen a 3x increase in our ROI since switching to Adminting. The targeting capabilities are unmatched.",
    author: "Emma Williams",
    role: "CEO",
    company: "Brand Elevate",
    avatar: "/avatars/avatar-3.png"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background/80 to-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            See what our clients have to say about their experience with Adminting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-card hover:bg-muted/50 border rounded-2xl p-6 space-y-4 transition-colors">
                <div className="text-primary">
                  <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.244 35.9091C9.15871 35.9091 5.89871 34.554 3.46399 31.8438C1.15881 29.0099 0.00621591 25.2017 0.00621591 20.419C0.00621591 15.7599 1.09144 11.6364 3.26189 8.04829C5.43235 4.46023 8.67462 1.65341 12.9887 -0.372727L15.0362 2.92045C11.4482 4.60795 8.87462 6.67045 7.31553 9.10795C5.75644 11.5455 4.97689 14.7756 4.97689 18.7983H6.51825C8.88917 18.7983 10.8051 19.5284 12.2662 20.9886C13.7514 22.4247 14.494 24.2841 14.494 26.5668C14.494 29.0284 13.7514 31.0398 12.2662 32.6009C10.8051 34.1396 8.88917 35.9091 13.244 35.9091ZM41.244 35.9091C37.1587 35.9091 33.8987 34.554 31.464 31.8438C29.1588 29.0099 28.0062 25.2017 28.0062 20.419C28.0062 15.7599 29.0914 11.6364 31.2619 8.04829C33.4324 4.46023 36.6746 1.65341 40.9887 -0.372727L43.0362 2.92045C39.4482 4.60795 36.8746 6.67045 35.3155 9.10795C33.7564 11.5455 32.9769 14.7756 32.9769 18.7983H34.5183C36.8892 18.7983 38.8051 19.5284 40.2662 20.9886C41.7514 22.4247 42.494 24.2841 42.494 26.5668C42.494 29.0284 41.7514 31.0398 40.2662 32.6009C38.8051 34.1396 36.8892 35.9091 41.244 35.9091Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-lg">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
