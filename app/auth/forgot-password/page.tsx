"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeftIcon, CheckCircle2Icon, MailIcon } from 'lucide-react'
import authService from '@/services/auth'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // set reset password for API comm in the Auth serive 
      const response = await authService.forgotPassword(email)
      console.log(response)

      setTimeout(() => {
        setIsLoading(false)
        setIsSubmitted(true)
      }, 1500)

    } catch (error: any) {
      const responseError = error.response?.data?.message || 'An error occured during password reset'
      setError(responseError)
    } finally {
      setIsLoading(false)
    }
  }

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
            {isSubmitted ? (
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
            {isSubmitted ? "Check your email" : "Forgot your password?"}
          </CardTitle>
          <CardDescription className="text-center">
            {isSubmitted
              ? `We've sent a password reset link to ${email}`
              : "Enter your email address and we'll send you a link to reset your password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span className="ml-2">Sending reset link...</span>
                  </div>
                ) : (
                  "Send reset link"
                )}
              </Button>
              {error && (
                <p className="text-sm text-red-500 mt-2 text-center">
                  {error}
                </p>
              )}
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-indigo-50 text-indigo-900">
                <p className="text-sm">
                  If you {"don't"} see the email in your inbox, please check your spam folder.
                  The link will expire in 1 hour.
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsSubmitted(false)
                  setEmail("")
                }}
              >
                Try another email
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center w-full text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
