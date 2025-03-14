'use client'
import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import authService from '@/services/auth'
import { Skeleton } from '@/components/ui/skeleton'
import { Toaster, toast } from 'sonner'
import { Eye, EyeOff } from "lucide-react";
import { useAccountSettingHandler, useUpdatePasswordHandler } from '@/hooks/use-submit'




export default function ProfileSettings() {
    const [isFetching, setIsFetching] = useState(true)
    const [passowordVisible, setIsPasswordVisible] = useState({
        isOldPasswordVisible: false,
        isNewPasswordVisible: false,
        isConfirmNewPasswordVisible: false
    })
    const {
        onSubmitUserHandler,
        onChangeHandler,
        userData,
        errors,
        isLoading,
        isEmpty,
        setUserData,
        isSuccessful } = useAccountSettingHandler()

    const {
        onChangePasswordHandler,
        passwordData,
        onSubmitPasswordHandler,
        passwordErrors,
        isPasswordLoading,
        isPasswordResetSuccessful } = useUpdatePasswordHandler()

    useEffect(() => {
        if (isSuccessful) {
            toast.success('Profile successfully updated');
        }

        if (isPasswordResetSuccessful) {
            toast.success('Password Change Successfully')
        }
    }, [isSuccessful, isPasswordResetSuccessful]);

    const toggleVisibiltyHandler = (key: keyof typeof passowordVisible): void => {
        setIsPasswordVisible((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };
    useEffect(() => {
        const getProfile = async () => {
            try {
                // Fetching user profile data
                const data = await authService.getProfile()

                // Extract first and last name from fullName array by spliting it to array
                const [firstName, lastName] = data.fullName.split(' ');

                // Set user state with fetched data
                setUserData({
                    firstName: firstName || '',
                    lastName: lastName || '',
                    companyName: data?.companyName || '',
                    phone: data?.phone || ''
                })
            } catch (error: any) {
                console.error('Error fetching profile data:', error)
            } finally {
                setIsFetching(false)
            }
        }
        getProfile()
    }, [])


    if (isFetching) {
        return (
            <div className="space-y-8 p-8">
                {/* Skeleton Header */}
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>

                {/* Skeleton for Personal Information Card */}
                <Card className="p-6">
                    <Skeleton className="h-6 w-40 mb-6" />
                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                </Card>

                {/* Skeleton for Password Management Card */}
                <Card className="p-6">
                    <Skeleton className="h-6 w-40 mb-6" />
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                </Card>

                {/* Skeleton for Onboarding Settings */}
                <Card className="p-6">
                    <Skeleton className="h-6 w-40 mb-6" />
                    <div className="space-y-4">
                        {[...Array(9)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                </Card>

                {/* Skeleton for Social Media Card */}
                <Card className="p-6">
                    <Skeleton className="h-6 w-40 mb-6" />
                </Card>
            </div>
        )
    }

    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="space-y-8 p-8">
                <div className="grid gap-6">
                    <div>
                        <h1 className="text-3xl font-bold">Account Setting</h1>
                        <p className="mt-2 text-gray-600">Manage your personal information</p>
                    </div>

                    {/* Personal Information Card */}
                    <Card className="p-6 relative">
                        <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                        <form className="space-y-4" onSubmit={onSubmitUserHandler}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First name</label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    value={userData.firstName}
                                    onChange={onChangeHandler}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last name</label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    value={userData.lastName}
                                    onChange={onChangeHandler}
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Company name</label>
                                <Input
                                    type="text"
                                    name="companyName"
                                    placeholder="Enter your company name"
                                    value={userData.companyName}
                                    onChange={onChangeHandler}
                                />
                                {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={userData.phone}
                                    onChange={onChangeHandler}
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>
                            <Button
                                disabled={isLoading || isEmpty()}
                                className="absolute top-[5px] right-[20px]"
                                title={isEmpty() ? 'Fill all form fields' : 'click to save'}
                            >
                                {isLoading ? 'Saving Changes...' : 'Save Changes'}
                            </Button>
                        </form>
                    </Card>

                    {/* Password Management Card */}
                    <Card className="p-6 relative">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-6">
                            <h2 className="text-xl font-semibold">Password Management</h2>
                            {passwordErrors.responseError && (
                                <p className="text-red-500 text-sm">{passwordErrors.responseError}</p>
                            )}
                        </div>
                        <form className="space-y-4" onSubmit={onSubmitPasswordHandler}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Old password</label>
                                <div className='relative'>
                                    <Input
                                        type={passowordVisible.isOldPasswordVisible ? 'text' : 'password'}
                                        name='oldPassword'
                                        placeholder="Enter old password"
                                        value={passwordData.oldPassword}
                                        onChange={onChangePasswordHandler}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibiltyHandler("isOldPasswordVisible")}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {passowordVisible.isOldPasswordVisible ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {passwordErrors.oldPassword && <p className="text-red-500 text-sm">{passwordErrors.oldPassword}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <div className='relative'>
                                    <Input
                                        type={passowordVisible.isNewPasswordVisible ? 'text' : 'password'}
                                        placeholder="Enter new password"
                                        name='newPassword'
                                        value={passwordData.newPassword}
                                        onChange={onChangePasswordHandler}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibiltyHandler("isNewPasswordVisible")}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {passowordVisible.isNewPasswordVisible ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>

                                {passwordErrors.newPassword && <p className="text-red-500 text-sm">{passwordErrors.newPassword}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm new password</label>
                                <div className='relative'>
                                    <Input
                                        type={passowordVisible.isConfirmNewPasswordVisible ? 'text' : 'password'}
                                        placeholder="Confirm new password"
                                        name='confirmNewPassword'
                                        value={passwordData.confirmNewPassword}
                                        onChange={onChangePasswordHandler}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibiltyHandler("isConfirmNewPasswordVisible")}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {passowordVisible.isConfirmNewPasswordVisible ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>

                                {passwordErrors.confirmNewPassword && <p className="text-red-500 text-sm">{passwordErrors.confirmNewPassword}</p>}
                            </div>
                            <Button
                                className='absolute top-[5px] right-[20px]'
                                disabled={isPasswordLoading}
                            >
                                {isPasswordLoading ? 'Saving password' : 'Save Password'}
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Onboarding Settings */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Onboarding</h2>
                    <form className="space-y-4">
                        {["Company Name", "Website", "Industry", "Role", "Business Type", "Target Audience", "Goals", "Billing Email", "Billing Address"].map((label, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700">{label}</label>
                                <Input type="text" placeholder={`Enter your ${label.toLowerCase()}`} />
                            </div>
                        ))}
                        <Button>Save Changes</Button>
                    </form>
                </Card>

                {/* Social Media Card */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Social Media Accounts</h2>
                    {/* Social media account links will go here */}
                </Card>
            </div>
        </>
    )
}
