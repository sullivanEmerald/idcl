"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { AnimatePresence, motion } from 'framer-motion'
import { LoadingOverlay } from '../ui/loading-overlay'

interface RoleGuardProps {
  children: React.ReactNode
  role: 'advertiser' | 'promoter'
}

export function RoleGuard({ children, role }: RoleGuardProps) {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [redirectMessage, setRedirectMessage] = useState('')

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        setIsRedirecting(true)
        setRedirectMessage('Please log in to continue...')
        setTimeout(() => {
          router.push('/auth/login')
        }, 500)
        return
      }

      if (user.role !== role) {
        setIsRedirecting(true)
        setRedirectMessage(`Redirecting to ${user.role} dashboard...`)
        setTimeout(() => {
          router.push(`/${user.role}/dashboard`)
        }, 500)
        return
      }
    }
  }, [isLoading, user, role, router])

  return (
    <AnimatePresence mode="wait">
      {isLoading || isRedirecting ? (
        <LoadingOverlay
          key="loading"
          message={isRedirecting ? redirectMessage : 'Checking permissions...'}
        />
      ) : user && user.role === role ? (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
