"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AuthGuard } from '@/components/guards/auth-guard'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
      <div className="container relative min-h-screen grid lg:grid-cols-2 items-center gap-8 py-12">
        {/* Left side - Branding */}
        <motion.div 
          className="hidden lg:flex flex-col justify-center space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <Image
              src="/logo.svg"
              alt="AdMinting Logo"
              width={180}
              height={40}
              className="h-10 w-auto"
            />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to AdMinting
            </h1>
            <p className="text-xl text-gray-600">
              Your gateway to effective digital advertising and promotion
            </p>
          </div>
          
          {/* Features list */}
          <div className="space-y-4">
            <FeatureItem
              title="Smart Campaign Management"
              description="Create and manage your advertising campaigns with ease"
            />
            <FeatureItem
              title="Real-time Analytics"
              description="Track your campaign performance in real-time"
            />
            <FeatureItem
              title="Secure Payments"
              description="Safe and transparent payment processing"
            />
          </div>
        </motion.div>

        {/* Right side - Auth Form */}
        <motion.div
          className="w-full max-w-md mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
    </AuthGuard>
  )
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <motion.div 
      className="flex items-start space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}
