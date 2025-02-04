/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2Icon, MailIcon, RefreshCwIcon } from 'lucide-react'
import authService from '@/services/auth'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [countdown, setCountdown] = useState(30)
  const [isResending, setIsResending] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResendCode = async () => {
    setIsResending(true)
    // TODO: Implement resend logic
    setTimeout(() => {
      setIsResending(false)
      setCountdown(30)
    }, 1000)
  }

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError('No verification token provided')
        setVerifying(false)
        return
      }

      try {
        const response = await authService.verifyEmail(token)
        setIsVerified(true)
        console.log('Verification response:', response)
        
        if (response?.user?._id && response?.user?.role && response?.accessToken) {
          // Save user ID, role and token in localStorage
          localStorage.setItem('userId', response.user._id)
          localStorage.setItem('userRole', response.user.role)
          localStorage.setItem('token', response.accessToken)
          
          // Redirect to appropriate onboarding page based on role after 2 seconds
          const role = response.user.role.toLowerCase()
          console.log('Redirecting to:', `/onboarding/${role}`)
          setTimeout(() => {
            router.push(`/onboarding/${role}`)
          }, 2000)
        } else {
          console.error('Response missing user details or token:', response)
          setError('Could not determine user details. Please contact support.')
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to verify email')
      } finally {
        setVerifying(false)
      }
    }

    verifyToken()
  }, [token])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="backdrop-blur-sm bg-white/80">
        <CardHeader className="space-y-1">
          <motion.div
            className="mx-auto w-16 h-16 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {isVerified ? (
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2Icon className="w-8 h-8 text-green-600" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <MailIcon className="w-8 h-8 text-indigo-600" />
              </div>
            )}
          </motion.div>
          <CardTitle className="text-2xl font-bold text-center">
            {isVerified ? "Email Verified!" : "Check your email"}
          </CardTitle>
          <CardDescription className="text-center">
            {isVerified ? (
              "Your email has been successfully verified. You can now proceed to your dashboard."
            ) : (
              "We've sent a verification link to your email address. Please click the link to verify your account."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isVerified && (
            <>
              <div className="p-4 rounded-lg bg-indigo-50 text-indigo-900">
                <p className="text-sm font-medium">
                  If you {"haven't"} received the email, please check your spam folder.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  onClick={handleResendCode}
                  disabled={countdown > 0 || isResending}
                  className="space-x-2"
                >
                  <RefreshCwIcon className="w-4 h-4" />
                  <span>
                    {isResending
                      ? "Sending..."
                      : countdown > 0
                      ? `Resend in ${countdown}s`
                      : "Resend email"}
                  </span>
                </Button>
              </div>
            </>
          )}
        </CardContent>
        {/* <CardFooter>
          {isVerified && (
            <Button
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              onClick={() => window.location.href = '/dashboard'}
            >
              Go to Dashboard
            </Button>
          )}
        </CardFooter> */}
      </Card>
    </motion.div>
  )
}
