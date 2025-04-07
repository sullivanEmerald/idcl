'use client'
import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { Toaster, toast } from 'sonner'
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePromoterAccountSettingHandler, usePromoterUpdatePasswordHandler } from '@/hooks/user/user-promoter'
import ReactSelect from 'react-select'
import promoterService from '@/services/promoter'
import { socialPlatforms } from '@/app/onboarding/promoter/page'
import { usePromoterOnboardingHandler } from '@/hooks/user/user-promoter'
import Select from 'react-select'



export default function ProfileSettings() {
  const [isFetching, setIsFetching] = useState(true)
  const [isConnected, setIsConnected] = useState(false);
  const [passwordVisible, setIsPasswordVisible] = useState({
    isOldPasswordVisible: false,
    isNewPasswordVisible: false,
    isConfirmNewPasswordVisible: false
  })
  const {
    onSubmitPromoterHandler,
    onChangePromoterHandler,
    userData,
    errors,
    isLoading,
    isEmpty,
    setUserData,
    isSuccessful } = usePromoterAccountSettingHandler()

  const {
    onChangePasswordHandler,
    passwordData,
    onSubmitPromoterPasswordHandler,
    passwordErrors,
    isPasswordLoading,
    isPasswordResetSuccessful } = usePromoterUpdatePasswordHandler();

  const {
    onboardingData,
    setOnboardingData,
    isUpdatingRecordSuccessful,
    onSubmitOnboardingHandler,
    isUpdatingRecord,
    onChangeOnboardingHandler } = usePromoterOnboardingHandler();

  useEffect(() => {
    if (isSuccessful) {
      toast.success('Profile successfully updated');
    }

    if (isPasswordResetSuccessful) {
      toast.success('Password Changed Successfully')
    }

    if (isUpdatingRecordSuccessful) {
      toast.success('Records Updated Successfully')
    }

  }, [isSuccessful, isPasswordResetSuccessful, isUpdatingRecordSuccessful]);

  const toggleVisibiltyHandler = (key: keyof typeof passwordVisible): void => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        // Fetching Promoter profile informations
        const { user } = await promoterService.getProfile();

        console.log(user)

        // Set user state with fetched data
        setUserData({
          companyName: user?.companyName || '',
          phoneNumber: user?.phoneNumber || '',
          fullName: user?.fullName || '',
        })

        // setting onboaring data
        setOnboardingData({
          location: user?.location || '',
          platforms: user?.platforms || [],
          followersCount: user?.followersCount || '',
          engagementRate: user?.engagementRate || '',
          audienceAge: user?.audienceAge || '',
          audienceInterests: user?.audienceInterests || [],
          contentTypes: user?.contentTypes || [],
          paymentMethod: user?.paymentMethod || '',
          accountDetails: user?.accountDetails || ''
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
            <h1 className="text-3xl font-bold">Promoter Account Settings</h1>
            <p className="mt-2 text-gray-600">Manage your promoter account information</p>
          </div>

          {/* Personal Information Card */}
          <Card className="p-6 relative">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            <form className="space-y-4" onSubmit={onSubmitPromoterHandler}>
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={userData.fullName}
                  name="fullName"
                  placeholder="Enter your full name"
                  onChange={onChangePromoterHandler}
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name='phoneNumber'
                  value={userData.phoneNumber}
                  placeholder="+1 (555) 000-0000"
                  onChange={onChangePromoterHandler}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company name</label>
                <Input
                  type="text"
                  name="companyName"
                  value={userData.companyName}
                  placeholder="Enter your company name"
                  onChange={onChangePromoterHandler}
                />
                {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 mb-6">
              <h2 className="text-xl font-semibold">Password Management</h2>
              {passwordErrors.responseError && (
                <p className="text-red-500 text-sm">{passwordErrors.responseError}</p>
              )}
            </div>
            <form className="space-y-4" onSubmit={onSubmitPromoterPasswordHandler}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Old password</label>
                <div className="relative">
                  <Input
                    type={passwordVisible.isOldPasswordVisible ? 'text' : 'password'}
                    name="oldPassword"
                    placeholder="Enter old password"
                    value={passwordData.oldPassword}
                    onChange={onChangePasswordHandler}
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibiltyHandler('isOldPasswordVisible')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {passwordVisible.isOldPasswordVisible ? (
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
                <div className="relative">
                  <Input
                    type={passwordVisible.isNewPasswordVisible ? 'text' : 'password'}
                    placeholder="Enter new password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={onChangePasswordHandler}
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibiltyHandler('isNewPasswordVisible')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {passwordVisible.isNewPasswordVisible ? (
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
                <div className="relative">
                  <Input
                    type={passwordVisible.isConfirmNewPasswordVisible ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    name="confirmNewPassword"
                    value={passwordData.confirmNewPassword}
                    onChange={onChangePasswordHandler}
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibiltyHandler('isConfirmNewPasswordVisible')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {passwordVisible.isConfirmNewPasswordVisible ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmNewPassword && (
                  <p className="text-red-500 text-sm">{passwordErrors.confirmNewPassword}</p>
                )}
              </div>
              <Button
                className="absolute top-[5px] right-[20px]"
                disabled={isPasswordLoading}
              >
                {isPasswordLoading ? 'Saving password' : 'Save Password'}
              </Button>
            </form>
          </Card>
        </div>

        {/* Onboarding Settings */}
        <Card className="p-6 relative">
          <h2 className="text-xl font-semibold mb-6">Onboarding</h2>
          <form className="space-y-4" onSubmit={onSubmitOnboardingHandler}>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={onboardingData.location}
                placeholder="City, Country"
                onChange={(e) => onChangeOnboardingHandler('location', e.target.value)}
              />
            </div>
            <div>
              <Label>Social Media Platforms</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {socialPlatforms.map((platform) => (
                  <Button
                    key={platform.value}
                    type="button"
                    variant={onboardingData.platforms.includes(platform.value) ? "default" : "outline"}
                    className={`justify-start ${onboardingData.platforms.includes(platform.value)
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : ""
                      }`}
                    onClick={() => {
                      const newPlatforms = onboardingData.platforms.includes(platform.value)
                        ? onboardingData.platforms.filter(p => p !== platform.value)
                        : [...onboardingData.platforms, platform.value]
                      onChangeOnboardingHandler('platforms', newPlatforms)
                    }}
                  >
                    {platform.label}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="followersCount">Total Followers</Label>
              <Input
                id="followersCount"
                value={onboardingData.followersCount}
                onChange={(e) => onChangeOnboardingHandler('followersCount', e.target.value)}
                placeholder="e.g. 10000"
              />
            </div>
            <div>
              <Label htmlFor="engagementRate">Average Engagement Rate</Label>
              <Input
                id="engagementRate"
                value={onboardingData.engagementRate}
                onChange={(e) => onChangeOnboardingHandler('engagementRate', e.target.value)}
                placeholder="e.g. 3.5%"
              />
            </div>
            <div>
              <Label htmlFor="audienceAge">Primary Audience Age Range</Label>
              <ShadcnSelect
                value={onboardingData.audienceAge}
                onValueChange={(value) => onChangeOnboardingHandler('audienceAge', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="13-17">13-17 years</SelectItem>
                  <SelectItem value="18-24">18-24 years</SelectItem>
                  <SelectItem value="25-34">25-34 years</SelectItem>
                  <SelectItem value="35-44">35-44 years</SelectItem>
                  <SelectItem value="45+">45+ years</SelectItem>
                </SelectContent>
              </ShadcnSelect>
            </div>
            <div>
              <Label>Audience Interests</Label>
              <Select
                isMulti
                options={[
                  { value: 'fashion', label: 'Fashion & Style' },
                  { value: 'tech', label: 'Technology' },
                  { value: 'gaming', label: 'Gaming' },
                  { value: 'beauty', label: 'Beauty & Cosmetics' },
                  { value: 'fitness', label: 'Fitness & Health' },
                  { value: 'food', label: 'Food & Cooking' },
                  { value: 'travel', label: 'Travel' },
                  { value: 'music', label: 'Music' },
                  { value: 'art', label: 'Art & Design' },
                  { value: 'business', label: 'Business & Entrepreneurship' },
                  { value: 'education', label: 'Education' },
                  { value: 'entertainment', label: 'Entertainment' },
                ]}
                value={onboardingData.audienceInterests.map(interest => ({
                  value: interest,
                  label: interest.charAt(0).toUpperCase() + interest.slice(1),
                }))}
                onChange={(newValue, actionMeta) => {
                  onChangeOnboardingHandler(
                    'audienceInterests',
                    newValue ? newValue.map(option => option.value) : []
                  );
                }}
                className="w-full"
                placeholder="Select audience interests..."
                classNamePrefix="select"
              />
            </div>
            <div>
              <Label>Content Types</Label>
              <Select
                isMulti
                options={[
                  { value: 'photos', label: 'Photos & Images' },
                  { value: 'videos', label: 'Videos' },
                  { value: 'reels', label: 'Reels & Short Videos' },
                  { value: 'stories', label: 'Stories' },
                  { value: 'live', label: 'Live Streaming' },
                  { value: 'blogs', label: 'Blog Posts' },
                  { value: 'reviews', label: 'Product Reviews' },
                  { value: 'tutorials', label: 'Tutorials & How-tos' },
                  { value: 'podcasts', label: 'Podcasts' },
                ]}
                value={onboardingData.contentTypes.map(type => ({
                  value: type,
                  label: type.charAt(0).toUpperCase() + type.slice(1)
                }))}
                onChange={(selected) => {
                  onChangeOnboardingHandler('contentTypes', selected ? selected.map(option => option.value) : []);
                }}
                className="w-full"
                placeholder="Select content types..."
                classNamePrefix="select"
              />
            </div>
            <div>
              <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
              <ShadcnSelect
                value={onboardingData.paymentMethod}
                onValueChange={(value) => onChangeOnboardingHandler('paymentMethod', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                </SelectContent>
              </ShadcnSelect>
            </div>
            <div>
              <Label htmlFor="accountDetails">Account Details</Label>
              <Textarea
                id="accountDetails"
                value={onboardingData.accountDetails}
                onChange={(e) => onChangeOnboardingHandler('accountDetails', e.target.value)}
                placeholder="Enter your payment account details"
                rows={3}
              />
            </div>
            <Button
              className="absolute top-[5px] right-[20px]"
              disabled={isUpdatingRecord}
            >
              {isUpdatingRecord ? 'Updating record' : 'Update record'}
            </Button>
          </form>
        </Card>

        {/* SOCIAL MEDIA PLATFORMS */}
        <Card className="p-6 relative">
          <h2 className="text-xl font-semibold mb-6">Social Media Management</h2>
          <div className="space-y-4"> {/* Added container for consistent spacing */}
            {onboardingData.platforms.map((item, index) => {
              const platform = item.charAt(0).toUpperCase() + item.slice(1);
              // State for connection status

              const handleConnect = () => {
                // Add your connection logic here (OAuth, API call, etc.)
                console.log(`Connecting to ${platform}...`);

                // Simulate connection
                setIsConnected(true);

                // In a real app, you would:
                // 1. Open OAuth popup
                // 2. Wait for callback
                // 3. Update state based on success
              };

              return (
                <div
                  key={index}
                  className="flex items-center justify-between py-3" // Improved spacing
                >
                  <div className="flex items-center">
                    {/* Platform icon would go here */}
                    <span className="ml-2 font-medium">{platform}</span>
                  </div>

                  <Button
                    onClick={handleConnect}
                    variant={isConnected ? "default" : "outline"}
                    className={`${isConnected
                      ? "bg-[#6540e6] text-white"
                      : "bg-transparent text-[#6540e6] border-dashed border-[#6540e6] hover:bg-[#6540e6]/10"
                      } transition-colors`}
                    disabled={isConnected}
                  >
                    {isConnected ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Connected
                      </>
                    ) : (
                      `Connect ${platform}`
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      </div >
    </>
  );
}
