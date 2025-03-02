"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import {
    ArrowLeftIcon,
    CheckCircle2Icon,
    SettingsIcon,
    Eye,
    EyeOff
} from "lucide-react"
import { useRouter, useSearchParams } from 'next/navigation'
import authService from '@/services/auth'
import { toast, Toaster } from 'sonner'


export default function ResetPasswordPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmNewPassword: ''
    })

    // Get the token from the route query params
    const searchParams = useSearchParams();
    const token = searchParams.get('token')

    // use useEffect to redirect to forgot password page when the token is null or unavailable
    useEffect(() => {
        if (!token) router.push('/auth/forgot-password')
    }, [token, router])


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        // remove whitespaces from the form input value with trim string method 
        const trimmedInputValue = value.trim();
        setFormData((prev) => ({
            ...prev,
            [name]: trimmedInputValue
        }))
    }

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');



        const { newPassword, confirmNewPassword } = formData;
        if (newPassword !== confirmNewPassword) {
            setError('Password mismatch');
            setIsLoading(false);
            return;
        }

        // use the reset password function in the authservice for server request/action
        try {
            await authService.resetPassword(token, newPassword)
            setIsSubmitted(true)

            setError('')
            toast.success('Password reset successful', {
                description: `Redirecting to login!`,
            })

            // redirecting to Login page after successful password reset
            setTimeout(() => {
                router.push('/auth/login')
            }, 2000)


        } catch (error: any) {
            const responseError = error.response?.data?.message || 'An error occcured during password reset'
            setError(responseError)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Toaster richColors position="top-center" />
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
                                    <SettingsIcon className="w-8 h-8 text-indigo-600" />
                                </div>
                            )}
                        </motion.div>
                        <CardTitle className="text-2xl font-bold text-center">
                            {"Reset Password"}
                        </CardTitle>
                        <CardDescription className="text-center">
                            {!isSubmitted ? "Enter your new password and continue with your login" : 'password reset was successful. redirecting to login'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={onSubmitHandler} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.newPassword}
                                        onChange={onChangeHandler}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            name="confirmNewPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            required
                                            value={formData.confirmNewPassword}
                                            onChange={onChangeHandler}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        <span className="ml-2">Resetting Password...</span>
                                    </div>
                                ) : (
                                    "Reset password"
                                )}
                            </Button>
                            {error && (
                                <p className="text-sm text-red-500 mt-2 text-center">
                                    {error}
                                </p>
                            )}
                        </form>
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
            </motion.div >
        </>
    )
}