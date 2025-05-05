/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { Toaster, toast } from 'sonner'
import { Eye, EyeOff, Key, User, ChevronDown, Settings, Dribbble, CirclePlus, UserRoundPen, LoaderCircle, Link2, Users, Send, Tag, BarChart2, Share2, Pencil, Trash2, Ban, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAccountSettingHandler, useUpdatePasswordHandler, useOnBoardingHandler } from '@/hooks/user/user-advertiser'
import ReactSelect from 'react-select'
import advertiserService from '@/services/advertiser'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"


export default function ProfileSettings() {
    const [isFetching, setIsFetching] = useState(true)
    const [passowordVisible, setIsPasswordVisible] = useState({
        isOldPasswordVisible: false,
        isNewPasswordVisible: false,
        isConfirmNewPasswordVisible: false
    })
    // Managing collapsible open and close
    const [isCollapsibleOpen, setIsCollapsibleOpen] = useState<Record<string, boolean>>({
        personal: false,
        password: false,
        onboarding: false
    })

    const handleCollapsibleToggle = (section: string, isOpen: boolean) => {
        setIsCollapsibleOpen(prev => {

            if (isOpen) {
                return {
                    personal: section === 'personal',
                    password: section === 'password',
                    onboarding: section === 'onboarding'
                };
            }
            return {
                ...prev,
                [section]: isOpen
            };
        });
    };

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
        isPasswordResetSuccessful } = useUpdatePasswordHandler();

    const {
        onChangeOnboardingHandler,
        onSubmitOnBoardingHandler,
        onboardingData,
        setOnboardingData,
        isOnboardingProcessLoading,
        isOnboardingProessSuccessful,
        isOnboardingProessError } = useOnBoardingHandler();

    useEffect(() => {
        if (isSuccessful) {
            toast.success('Profile successfully updated');
        }

        if (isPasswordResetSuccessful) {
            toast.success('Password Changed Successfully')
        }

        if (isOnboardingProessSuccessful) {
            toast.success('Records Updated Successfully')
        }
    }, [isSuccessful, isPasswordResetSuccessful, isOnboardingProessSuccessful]);

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
                const data = await advertiserService.getProfile();

                console.log(data)

                const [firstName, lastName] = data.fullName.split(' ')

                // Set user state with fetched data
                setUserData({
                    companyName: data.companyName,
                    phone: data.phoneNumber,
                    firstName: firstName,
                    lastName: lastName,
                })

                // setting onboarding values
                setOnboardingData({
                    website: data.website,
                    industry: data.industry,
                    companySize: data.companySize,
                    phoneNumber: data.phoneNumber,
                    businessType: data.businessType,
                    targetAudience: data.targetAudience,
                    goals: data.goals,
                    billingEmail: data.billingEmail,
                    billingAddress: data.billingAddress,
                })
            } catch (error: any) {
                const resError = error.response?.data?.message || 'An Error Occured'
                toast.error(resError)
            } finally {
                setIsFetching(false)
            }
        }
        getProfile();
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
            <div className="space-y-8 p-0 md:p-8">
                <div className="grid gap-4 md:gap-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">Advertiser Account Setting</h1>
                        <p className="mt-2 text-sm md:text-base text-gray-600">Manage your personal information</p>
                    </div>
                    {/* Personal Information Card */}
                    <Card className="overflow-hidden border border-gray-200">
                        <Collapsible
                            open={isCollapsibleOpen['personal']}
                            onOpenChange={(isOpen) => {
                                handleCollapsibleToggle('personal', isOpen)
                            }}
                        >
                            <CollapsibleTrigger asChild>
                                <div className='flex justify-between items-center px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors'>
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <User className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <h2 className="text-xl font-semibold">Personal Information</h2>
                                    </div>
                                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isCollapsibleOpen['personal'] ? 'rotate-180' : ''}`} />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                                <Card className="mx-0 border-t border-gray-200 rounded-t-none relative">
                                    <div className="p-6 pt-6 mb-10">
                                        {errors.responseError && <p className="text-red-500 text-sm">{errors.responseError}</p>}
                                        <form className="space-y-4 relative" onSubmit={onSubmitUserHandler}>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">First name</label>
                                                    <Input
                                                        type="text"
                                                        name="firstName"
                                                        placeholder="Enter your first name"
                                                        value={userData.firstName}
                                                        onChange={onChangeHandler}
                                                        className="mt-1"
                                                    />
                                                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Last name</label>
                                                    <Input
                                                        type="text"
                                                        name="lastName"
                                                        placeholder="Enter your last name"
                                                        value={userData.lastName}
                                                        onChange={onChangeHandler}
                                                        className="mt-1"
                                                    />
                                                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Company name</label>
                                                    <Input
                                                        type="text"
                                                        name="companyName"
                                                        placeholder="Enter your company name"
                                                        value={userData.companyName}
                                                        onChange={onChangeHandler}
                                                        className="mt-1"
                                                    />
                                                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                                    <Input
                                                        type="tel"
                                                        name="phone"
                                                        placeholder="Enter your phone number"
                                                        value={userData.phone}
                                                        onChange={onChangeHandler}
                                                        className="mt-1"
                                                    />
                                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                                </div>
                                            </div>
                                            <Button
                                                disabled={isLoading || isEmpty()}
                                                className="w-32 absolute right-0"
                                                title={isEmpty() ? 'Fill all form fields' : 'click to save'}
                                            >
                                                {isLoading ?
                                                    <div className="flex items-center justify-center">
                                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                        <span className="ml-2">Saving Changes...</span>
                                                    </div>
                                                    :
                                                    'Save Changes'}
                                            </Button>
                                        </form>
                                    </div>
                                </Card>
                            </CollapsibleContent>
                        </Collapsible>
                    </Card>

                    {/* Password Management Card */}
                    <Card className="overflow-hidden border border-gray-200">
                        <Collapsible
                            open={isCollapsibleOpen['password']}
                            onOpenChange={(isOpen) => {
                                handleCollapsibleToggle('password', isOpen)
                            }}
                        >
                            <CollapsibleTrigger asChild>
                                <div className='flex justify-between items-center px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors'>
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <Key className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <h2 className="text-xl font-semibold">Password Management</h2>
                                    </div>
                                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isCollapsibleOpen['password'] ? 'rotate-180' : ''}`} />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                                <Card className="mx-0 border-t border-gray-200 rounded-t-none relative">
                                    <div className="p-6 pt-6 mb-10">
                                        {passwordErrors.responseError && (
                                            <p className="text-red-500 text-sm">{passwordErrors.responseError}</p>
                                        )}
                                        <form className="space-y-4" onSubmit={onSubmitPasswordHandler}>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Old password</label>
                                                    <div className='relative'>
                                                        <Input
                                                            type={passowordVisible.isOldPasswordVisible ? 'text' : 'password'}
                                                            name='oldPassword'
                                                            placeholder="Enter old password"
                                                            value={passwordData.oldPassword}
                                                            onChange={onChangePasswordHandler}
                                                            className="mt-1"
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
                                                    {passwordErrors.oldPassword && <p className="text-red-500 text-sm mt-1">{passwordErrors.oldPassword}</p>}
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
                                                            className="mt-1"
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
                                                    {passwordErrors.newPassword && <p className="text-red-500 text-sm mt-1">{passwordErrors.newPassword}</p>}
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700">Confirm new password</label>
                                                    <div className='relative'>
                                                        <Input
                                                            type={passowordVisible.isConfirmNewPasswordVisible ? 'text' : 'password'}
                                                            placeholder="Confirm new password"
                                                            name='confirmNewPassword'
                                                            value={passwordData.confirmNewPassword}
                                                            onChange={onChangePasswordHandler}
                                                            className="mt-1"
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
                                                    {passwordErrors.confirmNewPassword && <p className="text-red-500 text-sm mt-1">{passwordErrors.confirmNewPassword}</p>}
                                                </div>
                                            </div>
                                            <Button
                                                className='w-32 absolute right-5'
                                                disabled={isPasswordLoading}
                                            >
                                                {isPasswordLoading ?
                                                    <div className="flex items-center justify-center">
                                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                        <span className="ml-2">Saving Password...</span>
                                                    </div>
                                                    : 'Save Password'}
                                            </Button>
                                        </form>
                                    </div>
                                </Card>
                            </CollapsibleContent>
                        </Collapsible>
                    </Card>
                </div>

                {/* Onboarding Settings */}
                <Card className="overflow-hidden border border-gray-200">
                    <Collapsible
                        open={isCollapsibleOpen['onboarding']}
                        onOpenChange={(isOpen) => {
                            handleCollapsibleToggle('onboarding', isOpen)
                        }}
                    >
                        <CollapsibleTrigger asChild>
                            <div className='flex justify-between items-center px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors'>
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <Settings className="h-5 w-5 text-red-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold">Complete Profile Setting (Onboarding)</h2>
                                </div>
                                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isCollapsibleOpen['onboarding'] ? 'rotate-180' : ''}`} />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                            <Card className="mx-0 border-t border-gray-200 rounded-t-none relative">
                                <div className="p-6 pt-6 mb-10">
                                    <form className="space-y-4" onSubmit={onSubmitOnBoardingHandler}>
                                        <div>
                                            <Label htmlFor='companyWebsite' className="block text-sm font-medium text-gray-700">Website</Label>
                                            <Input
                                                id='companyWebsite'
                                                type="text"
                                                name="website"
                                                value={onboardingData.website}
                                                onChange={(event) => onChangeOnboardingHandler('website', event.target.value)}
                                                placeholder="Enter your company website"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='industry' className="block text-sm font-medium text-gray-700">Industry</label>
                                            <Select
                                                value={onboardingData.industry}
                                                onValueChange={(value) => onChangeOnboardingHandler('industry', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your industry" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="tech">Technology</SelectItem>
                                                    <SelectItem value="retail">Retail</SelectItem>
                                                    <SelectItem value="finance">Finance</SelectItem>
                                                    <SelectItem value="healthcare">Healthcare</SelectItem>
                                                    <SelectItem value="education">Education</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="companySize">Company Size</Label>
                                            <Select
                                                value={onboardingData.companySize}
                                                onValueChange={(value) => onChangeOnboardingHandler('companySize', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select company size">
                                                        {onboardingData.companySize
                                                            ? `${onboardingData.companySize} employees`
                                                            : "Select company size"}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1-10">1-10 employees</SelectItem>
                                                    <SelectItem value="11-50">11-50 employees</SelectItem>
                                                    <SelectItem value="51-200">51-200 employees</SelectItem>
                                                    <SelectItem value="201-500">201-500 employees</SelectItem>
                                                    <SelectItem value="500+">500+ employees</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="targetAudience">Target Audience</Label>
                                            <ReactSelect
                                                isMulti
                                                value={onboardingData.targetAudience}
                                                onChange={(newValue) => onChangeOnboardingHandler('targetAudience', newValue || [])}
                                                options={[
                                                    { label: 'Gen Z (Under 25)', value: 'Gen Z' },
                                                    { label: 'Millennials (25-40)', value: 'Millennials' },
                                                    { label: 'Gen X (41-56)', value: 'Gen X' },
                                                    { label: 'Baby Boomers (57-75)', value: 'Baby Boomers' },
                                                    { label: 'Students', value: 'Students' },
                                                    { label: 'Young Professionals', value: 'Young Professionals' },
                                                    { label: 'Parents', value: 'Parents' },
                                                    { label: 'Business Decision Makers', value: 'Business Decision Makers' },
                                                    { label: 'Tech Enthusiasts', value: 'Tech Enthusiasts' },
                                                    { label: 'Fashion & Beauty', value: 'Fashion & Beauty' },
                                                    { label: 'Health & Fitness', value: 'Health & Fitness' },
                                                    { label: 'Gamers', value: 'Gamers' },
                                                    { label: 'Travelers', value: 'Travelers' },
                                                    { label: 'Foodies', value: 'Foodies' }
                                                ]}
                                                placeholder="Select target audiences"
                                                className="w-full"
                                                classNamePrefix="select"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="businessType">Type of Business</Label>
                                            <Select
                                                value={onboardingData.businessType}
                                                onValueChange={(value) => onChangeOnboardingHandler('businessType', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select business type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="b2b">B2B</SelectItem>
                                                    <SelectItem value="b2c">B2C</SelectItem>
                                                    <SelectItem value="both">Both B2B and B2C</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="goals">Marketing Goals</Label>
                                            <Textarea
                                                id="goals"
                                                value={onboardingData.goals}
                                                onChange={(e) => onChangeOnboardingHandler('goals', e.target.value)}
                                                placeholder="What are your main marketing objectives?"
                                                rows={3}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="billingEmail">Billing Email</Label>
                                            <Input
                                                id="billingEmail"
                                                value={onboardingData.billingEmail}
                                                onChange={(e) => onChangeOnboardingHandler('billingEmail', e.target.value)}
                                                type="email"
                                                placeholder="billing@company.com"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="billingAddress">Billing Address</Label>
                                            <Textarea
                                                id="billingAddress"
                                                value={onboardingData.billingAddress}
                                                onChange={(e) => onChangeOnboardingHandler('billingAddress', e.target.value)}
                                                placeholder="Enter your billing address"
                                                rows={3}
                                            />
                                        </div>
                                        {isOnboardingProessError && <p className="text-red-500 text-sm">{isOnboardingProessError}</p>}

                                        <Button
                                            disabled={isOnboardingProcessLoading}
                                            className="w-32 absolute right-5"
                                        >
                                            {isOnboardingProcessLoading ?
                                                <div className="flex items-center justify-center">
                                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                    <span className="ml-2">Updating...</span>
                                                </div> : 'Save Changes'}
                                        </Button>
                                    </form>
                                </div>
                            </Card>
                        </CollapsibleContent>
                    </Collapsible>
                </Card>

            </div>
        </>
    )
}
