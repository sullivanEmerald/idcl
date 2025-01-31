"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for small businesses getting started with digital advertising",
    features: [
      "Up to 5 active campaigns",
      "Basic analytics dashboard",
      "Email support",
      "Access to verified promoters",
      "Real-time tracking"
    ]
  },
  {
    name: "Professional",
    price: "$299",
    description: "Ideal for growing businesses with established marketing needs",
    features: [
      "Up to 20 active campaigns",
      "Advanced analytics & reporting",
      "Priority support",
      "Custom campaign strategies",
      "API access",
      "Dedicated account manager"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large-scale advertising operations",
    features: [
      "Unlimited campaigns",
      "Custom analytics integration",
      "24/7 premium support",
      "White-label solutions",
      "Custom API development",
      "Multi-user access",
      "Strategic consulting"
    ]
  }
]

export function PricingSection() {
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
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Choose the perfect plan for your advertising needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-card hover:bg-muted/50 border rounded-2xl p-6 space-y-6 transition-colors">
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-x-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                  </div>
                  <p className="mt-4 text-muted-foreground">{plan.description}</p>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  Get Started
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
