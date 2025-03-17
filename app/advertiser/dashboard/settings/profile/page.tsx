'use client'
import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { Toaster, toast } from 'sonner'
import { Eye, EyeOff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAccountSettingHandler, useUpdatePasswordHandler, useOnBoardingHandler } from '@/hooks/use-submit'
import ReactSelect from 'react-select'
import userService from '@/services/user'


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
                const data = await userService.getProfile();

                console.log(data)

                // the firstName and LastName will appear empty fields intially due to change in 
                // user schema. For recent accounts, everything works properly 

                // Set user state with fetched data
                setUserData({
                    companyName: data?.companyName || '',
                    phone: data?.phoneNumber || '',
                    firstName: data?.fullName.split(" ")[0],
                    lastName: data?.fullName.split(" ")[1],
                })

                // setting onboarding values
                setOnboardingData({
                    website: data?.website || '',
                    industry: data?.industry || '',
                    companySize: data?.companySize || '',
                    phoneNumber: data?.phoneNumber || '',
                    businessType: data?.businessType || '',
                    targetAudience: data?.targetAudience || [],
                    goals: data?.goals || '',
                    billingEmail: data.billingEmail || '',
                    billingAddress: data?.billingAddress || '',
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
                        >
                            {isOnboardingProcessLoading ? 'Updating Records' : 'Save Changes'}
                        </Button>
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
