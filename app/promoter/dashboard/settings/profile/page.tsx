/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePromoterAccountSettingHandler, usePromoterUpdatePasswordHandler } from '@/hooks/user/user-promoter'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from 'next/link';
import promoterService from '@/services/promoter'
import { usePromoterOnboardingHandler } from '@/hooks/user/user-promoter'
import Select from 'react-select'
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import EditAccountField from '@/components/promoter/editAccountField'
import Image from 'next/image'


// type SocialPlatforms = 'facebook' | 'twitter' | 'instagram' | 'instagram' | 'tiktok' | 'youtube';


const socialIcons: Record<string, JSX.Element> = {
  instagram: <Instagram className="w-6 h-6 text-pink-500" />,
  facebook: <Facebook className="w-6 h-6 text-blue-600" />,
  youtube: <Youtube className="w-6 h-6 text-red-600" />,
  twitter: <Twitter className="w-6 h-6 text-blue-500" />,
  tiktok: <Image src='/tiktok.png' alt='titkok' width={30} height={30} />,
};

const socialPlatforms = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'facebook', label: 'Facebook' }
]

type SocialPlatformsType = {
  facebook: SocialPlatformType[];
  twitter: SocialPlatformType[];
  instagram: SocialPlatformType[];
  youtube: SocialPlatformType[];
  tiktok: SocialPlatformType[];
};

type SocialPlatformType = {
  id: string;
  handle: string;
  followers: string;
  niches: string[];
};


export default function ProfileSettings() {
  const [isFetching, setIsFetching] = useState(true)
  const [passwordVisible, setIsPasswordVisible] = useState({
    isOldPasswordVisible: false,
    isNewPasswordVisible: false,
    isConfirmNewPasswordVisible: false
  })
  // setting the state for each social for the loading states
  const [isRemovingSocial, setIsRemovingSocial] = useState<Record<string, boolean>>(
    (socialPlatforms || []).reduce((acc: Record<string, boolean>, { value }) => {
      acc[value.toLowerCase()] = false;
      return acc;
    }, {})
  );
  // setting state for each platform edit and view accounts
  const [toggleAddedDialog, setToggleAddedDialog] = useState<Record<string, boolean>>(
    (socialPlatforms || []).reduce((acc: Record<string, boolean>, { value }) => {
      acc[value.toLowerCase()] = false;
      return acc;
    }, {})
  );

  // for loading deleting each social account
  const [isDeletingAccounts, setIsDeletingAccounts] = useState<Record<string, boolean>>({});
  const [isEditAccounts, setIsEditAccounts] = useState<Record<string, boolean>>({});
  const [isEditLoding, setIsEditLoding] = useState<Record<string, boolean>>({});
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState<Record<string, boolean>>({})


  // To open individual dialog box
  const [dialogOpenStates, setDialogOpenStates] = useState<Record<string, boolean>>(
    (socialPlatforms || []).reduce((acc: Record<string, boolean>, { value }) => {
      acc[value.toLowerCase()] = false;
      return acc;
    }, {})
  );

  // setting data for each socials to be added
  const [formData, setFormData] = useState({
    handle: '',
    followers: '',
    niches: [] as string[]
  });


  const [currentPlatform, setCurrentPlatform] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [open, setOpen] = useState(false);
  const [promoterSocials, setPromoterSocials] = useState<SocialPlatformsType>({
    facebook: [],
    twitter: [],
    instagram: [],
    youtube: [],
    tiktok: [],
  })


  const handleAddSocial = (platform: string) => {
    setCurrentPlatform(platform);
    // Reset form when opening a new dialog
    setFormData({
      handle: '',
      followers: '',
      niches: []
    });
  };


  const handleDialogOpenChange = (platform: string, isOpen: boolean) => {
    setDialogOpenStates(prev => ({
      ...prev,
      [platform]: isOpen
    }));

    if (!isOpen) {
      setToggleAddedDialog(prev => ({
        ...prev,
        [platform]: false
      }));
    }
  };

  const editPopoverHandler = (id: string, isOpen: boolean) => {
    setIsEditAccounts((prev) => ({
      ...prev,
      [id]: isOpen
    }))

    if (!isOpen) {
      setIsEditAccounts((prev) => ({
        ...prev,
        [id]: false
      }))
    }
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const submitSocialHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true)

    try {
      const socialResponse = await promoterService.addPromoterSocial({
        ...formData,
        currentPlatform
      })

      setOnboardingData((prev) => ({
        ...prev,
        platforms: prev.platforms.includes(currentPlatform)
          ? prev.platforms
          : [...prev.platforms, currentPlatform],
      }));

      setPromoterSocials((prev) => ({
        ...prev,
        [currentPlatform]: [
          ...(prev[currentPlatform as keyof typeof prev] || []),
          socialResponse
        ]
      }));

      toast.success(`${currentPlatform} added successfully`)

      setToggleAddedDialog((prev) => ({
        ...prev,
        [currentPlatform]: false
      }))

      // Reset after submission
      setCurrentPlatform('');

      setOpen(false)

    } catch (error: any) {
      const resError = error.response?.data?.message || 'An errror occurred'
      toast.error(resError)
    } finally {
      setIsAdding(false)
    }
  };


  const submitEditAccountHandler = async (id: string) => {

    setIsEditLoding((prev) => ({
      ...prev,
      [id]: true
    }))

    try {

      const data = await promoterService.editSocialAccount(id, {
        ...formData,
        currentPlatform
      })
      console.log(data)

      setPromoterSocials((prev) => ({
        ...prev,
        [currentPlatform]: data
      }))

      setCurrentPlatform('');

      setFormData({
        handle: '',
        followers: '',
        niches: []
      })

      setIsEditAccounts((prev) => ({
        ...prev,
        [id]: false
      }))


    } catch (error: any) {
      const resError = error?.response?.data?.message || 'An error occured. Try again'
      toast.error(resError)
    } finally {
      setIsEditLoding((prev) => ({
        ...prev,
        [id]: false
      }))
    }

  }

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
    onChangeOnboardingHandler,
  } = usePromoterOnboardingHandler();

  const toggleVisibiltyHandler = (key: keyof typeof passwordVisible): void => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        // Fetching Promoter profile informations and Socials
        const [{ user }, promoterSocialData] = await Promise.all([
          promoterService.getProfile(),
          promoterService.getSocial(),
        ])

        if (!user) {
          setIsFetching(true)
        }

        // Set user state with fetched data
        setUserData({
          companyName: user.companyName,
          phoneNumber: user.phoneNumber,
          fullName: user.fullName,
        })

        // setting onboaring data
        setOnboardingData({
          location: user.location,
          platforms: user.platforms,
          followersCount: user.followersCount,
          engagementRate: user.engagementRate,
          audienceAge: user.audienceAge,
          audienceInterests: user.audienceInterests,
          contentTypes: user.contentTypes,
          paymentMethod: user.paymentMethod,
          accountDetails: user.accountDetails
        })

        // setting the promoter socials
        setPromoterSocials({
          facebook: promoterSocialData.facebook,
          twitter: promoterSocialData.twitter,
          tiktok: promoterSocialData.tiktok,
          instagram: promoterSocialData.instagram,
          youtube: promoterSocialData.youtube
        })

      } catch (error: any) {
        console.error('Error fetching profile data:', error)
      } finally {
        setIsFetching(false)
      }
    }
    getProfile()
  }, [])

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


  const deleteSocialAccount = async (id: string, platform: string) => {

    setIsDeletingAccounts((prev) => ({
      ...prev,
      [id]: true
    }))

    try {
      await promoterService.deleteAccount(id, platform);
      setPromoterSocials((prev) => ({
        ...prev,
        [platform as keyof SocialPlatformsType]: prev[platform as keyof SocialPlatformsType].filter((item) => item.id !== id)
      }));
    } catch (error: any) {
      const resError = error.response?.data?.message || 'An error occurred. Check your network and try again';
      toast.error(resError);
    } finally {
      setIsDeletingAccounts((prev) => ({
        ...prev,
        [id]: false
      }))
    }
  };


  const removeSocialHandler = async (social: string, index: number) => {
    try {
      // setting loaders for each social that is being removed
      setIsRemovingSocial((prev) => ({
        ...prev,
        [social]: true
      }))

      // calling API request function
      await promoterService.removePromoterSocial(social)

      // resetting the UI after successful API request
      setOnboardingData((prev) => ({
        ...prev,
        platforms: prev.platforms.filter((item) => item.toLowerCase() !== social)
      }))

      toast.success(`removed ${social} from your socials`, {
        action: {
          label: 'Undo',
          onClick: async () => {
            try {
              await promoterService.undoRemoval(social)
              setOnboardingData((prev) => ({
                ...prev,
                platforms: [
                  ...prev.platforms.slice(0, index),
                  social,
                  ...prev.platforms.slice(index)
                ]
              }))
              toast.success(`${social} restored`)
            } catch (error: any) {
              const resError = error.response?.data?.message || 'An error occured'
              toast.error(resError)
            }
          }
        },
      })

    } catch (error: any) {
      const responseError = error.response?.data?.message || 'An error occured'
      toast.error(responseError)
    } finally {
      setIsRemovingSocial((prev) => ({
        ...prev,
        [social]: false
      }))
    }
  }




  if (isFetching) {
    return (
      <div className="space-y-8 p-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Card className="p-6">
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </Card>


        <Card className="p-6">
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="space-y-4">
            {[...Array(9)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </Card>


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
          <Card className="overflow-hidden border border-gray-200">
            <Collapsible
              open={isCollapsibleOpen['personal']}
              onOpenChange={(isOpen) => {
                setIsCollapsibleOpen((prev) => ({
                  ...prev,
                  ['personal']: isOpen
                }))
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
                  <div className="p-6 pt-16">
                    <form className="space-y-4" onSubmit={onSubmitPromoterHandler}>
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={userData.fullName}
                          name="fullName"
                          placeholder="Enter your full name"
                          onChange={onChangePromoterHandler}
                          className="bg-gray-50 border-gray-200"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          value={userData.phoneNumber}
                          placeholder="+1 (555) 000-0000"
                          onChange={onChangePromoterHandler}
                          className="bg-gray-50 border-gray-200"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                      </div>

                      <div>
                        <Label htmlFor="companyName">Company name</Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          value={userData.companyName}
                          placeholder="Enter your company name"
                          onChange={onChangePromoterHandler}
                          className="bg-gray-50 border-gray-200"
                        />
                        {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                      </div>

                      <Button
                        disabled={isLoading || isEmpty()}
                        className="absolute top-3 right-6 bg-blue-600 hover:bg-blue-700"
                        title={isEmpty() ? 'Fill all form fields' : 'click to save'}
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </span>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </form>
                  </div>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </Card>
          {/* Password Setting Section */}
          <Card className="overflow-hidden border border-gray-200">
            <Collapsible
              open={isCollapsibleOpen['password']}
              onOpenChange={(isOpen) => {
                setIsCollapsibleOpen((prev) => ({
                  ...prev,
                  ['password']: isOpen
                }))
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
              <CollapsibleContent className='relative'>
                <Card className="mx-0 border-t border-gray-200 rounded-t-none relative">
                  <div className='p-6 pt-12'>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 mb-6">
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
                        className="absolute top-4 right-6"
                        disabled={isPasswordLoading}
                      >
                        {isPasswordLoading ? 'Saving password' : 'Save Password'}
                      </Button>
                    </form>
                  </div>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>

        {/* Onboarding section */}
        <Card className="overflow-hidden border border-gray-200">
          <Collapsible
            open={isCollapsibleOpen['onboarding']}
            onOpenChange={(isOpen) => {
              setIsCollapsibleOpen((prev) => ({
                ...prev,
                ['onboarding']: isOpen
              }))
            }}
          >
            <CollapsibleTrigger asChild>
              <div className='flex justify-between items-center px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors'>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Settings className="h-5 w-5 text-red-600" />
                  </div>
                  <h2 className="text-xl font-semibold">Complete Profile (Onboarding)</h2>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isCollapsibleOpen['onboarding'] ? 'rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <Card className="mx-0 border-t border-gray-200 rounded-t-none relative">
                <div className="p-6 pt-14">
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
                    {/* <div>
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
            </div> */}
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
                      className="absolute top-2 right-6"
                      disabled={isUpdatingRecord}
                    >
                      {isUpdatingRecord ? 'Updating record' : 'Update record'}
                    </Button>
                  </form>
                </div>
              </Card>

            </CollapsibleContent>
          </Collapsible>
        </Card>



        {/* SOCIAL MEDIA PLATFORMS */}
        <Card className="overflow-hidden border border-gray-200">
          <Collapsible
            open={isCollapsibleOpen['socials']}
            onOpenChange={(isOpen) => {
              setIsCollapsibleOpen((prev) => ({
                ...prev,
                ['socials']: isOpen
              }))
            }}
          >
            <CollapsibleTrigger asChild>
              <div className='flex justify-between items-center px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors'>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Dribbble className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold">Socials Management</h2>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isCollapsibleOpen['socials'] ? 'rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="mx-0 border-t border-gray-200 rounded-t-none relative">
                <div className="space-y-4 p-6">
                  {socialPlatforms.map(({ value, label }, index) => {
                    const platformKey = value.toLowerCase() as keyof SocialPlatformsType;
                    const isAdded = onboardingData.platforms.includes(value.toLowerCase());
                    const isLoading = isRemovingSocial[value.toLowerCase()];
                    const isNotEmpty = promoterSocials[platformKey].length > 0;

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3"
                      >
                        <div className="flex items-center gap-2">
                          {socialIcons[platformKey]}
                          <span className="ml-2 font-medium">{label}</span>
                        </div>

                        {isLoading ? (
                          <LoaderCircle className="animate-spin text-red-500 w-6 h-6" />
                        ) : isAdded ? (
                          isNotEmpty ? (
                            <Dialog
                              open={dialogOpenStates[platformKey]}
                              onOpenChange={(isOpen) => handleDialogOpenChange(platformKey, isOpen)}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="gap-2 border border-blue-500"
                                  onClick={() => {
                                    handleAddSocial(platformKey);
                                    setDialogOpenStates(prev => ({
                                      ...prev,
                                      [platformKey]: true
                                    }));
                                  }}
                                >
                                  <Eye className="w-4 h-4 text-blue-500" />
                                  <span className='text-blue-500'>View Profile</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <div className='flex items-center gap-2'>
                                    {socialIcons[platformKey]}
                                    <h2 className="text-xl font-semibold">
                                      {toggleAddedDialog[platformKey] ? `Add ${platformKey} Profile` : `${platformKey} Profiles`}
                                    </h2>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {toggleAddedDialog[platformKey] ? "Add a new social profile" : "Manage all your connected accounts"}
                                  </p>
                                </DialogHeader>

                                {toggleAddedDialog[platformKey] ? (
                                  <div className="grid gap-4 py-4">
                                    <form onSubmit={submitSocialHandler}>
                                      <div className="grid gap-6 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="handle" className="text-right flex items-center gap-2">
                                            <Link2 className="w-4 h-4" />
                                            Handle
                                          </Label>
                                          <Input
                                            id="handle"
                                            value={formData.handle}
                                            onChange={handleInputChange}
                                            placeholder={`https://${currentPlatform.toLowerCase()}.com/you`}
                                            className="col-span-3"

                                          />
                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="followers" className="text-right flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            Followers
                                          </Label>
                                          <Input
                                            id="followers"
                                            type="text"
                                            value={formData.followers}
                                            onChange={handleInputChange}
                                            placeholder="5000"
                                            className="col-span-3"
                                            required
                                          />
                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="niche" className="text-right flex items-center gap-2">
                                            <Tag className="w-4 h-4" />
                                            Niche
                                          </Label>
                                          <div className="col-span-3">
                                            <Select
                                              isMulti
                                              name="niches"
                                              id="niches"
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
                                              value={formData.niches.map(interest => ({
                                                value: interest,
                                                label: interest.charAt(0).toUpperCase() + interest.slice(1).replace(/_/g, ' ')
                                              }))}
                                              onChange={(selected) => {
                                                setFormData(prev => ({
                                                  ...prev,
                                                  niches: selected ? selected.map(option => option.value) : []
                                                }));
                                              }}
                                              className="w-full"
                                              placeholder="Select niches (e.g. Fashion, Tech)..."
                                              classNamePrefix="select"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <DialogFooter className="flex justify-end gap-2">
                                        <Button
                                          variant="destructive"
                                          className="gap-2"
                                          onClick={() => setToggleAddedDialog((prev) => ({
                                            ...prev,
                                            [platformKey]: false
                                          }))}
                                        >
                                          <Ban className="w-4 h-4" />
                                          Cancel
                                        </Button>
                                        <Button
                                          type="submit"
                                          className="gap-2"
                                          disabled={isAdding}
                                        >
                                          {isAdding ? (
                                            <LoaderCircle className='animate-spin' />
                                          ) : (
                                            <>
                                              <CirclePlus className="w-4 h-4" />
                                              Add Profile
                                            </>
                                          )}
                                        </Button>
                                      </DialogFooter>
                                    </form>
                                  </div>
                                ) : (
                                  <>
                                    <div className="grid gap-4 py-4">
                                      {promoterSocials[platformKey]?.map((profile) => (
                                        <div
                                          key={profile.id}
                                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                        >
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                              <Link
                                                href={profile.handle}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium hover:underline truncate flex items-center gap-1"
                                              >
                                                {profile.handle}
                                                <Link2 className="w-3 h-3 flex-shrink-0 text-muted-foreground" />
                                              </Link>
                                            </div>
                                            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                                              <span className="flex items-center gap-1">
                                                <BarChart2 className="w-3 h-3" />
                                                {profile.followers.toLocaleString()} followers
                                              </span>
                                              <span className="flex items-center gap-1 truncate">
                                                {/* {profile.niches.join(', ') || []} */}
                                              </span>
                                            </div>
                                          </div>

                                          <div className="flex gap-2 ml-4">
                                            <Popover
                                              open={isEditAccounts[profile.id]}
                                              onOpenChange={(isOpen) => {
                                                editPopoverHandler(profile.id, isOpen);

                                                if (isOpen) {
                                                  setFormData({
                                                    handle: profile.handle,
                                                    followers: profile.followers,
                                                    niches: profile.niches
                                                  });
                                                  setCurrentPlatform(platformKey)
                                                } else {
                                                  if (!isEditLoding[profile.id]) {
                                                    setFormData({
                                                      handle: '',
                                                      followers: '',
                                                      niches: []
                                                    });
                                                    setCurrentPlatform('');
                                                  }
                                                }
                                              }}
                                            >
                                              <PopoverTrigger>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-8 w-8"
                                                >
                                                  <Pencil className="w-4 h-4" />
                                                </Button>
                                              </PopoverTrigger>
                                              <PopoverContent className='w-[500px]'>
                                                <form onSubmit={(e) => {
                                                  e.preventDefault();
                                                  submitEditAccountHandler(profile.id);
                                                }}>
                                                  <EditAccountField
                                                    formData={formData}
                                                    handle={profile.handle}
                                                    handleInputChange={handleInputChange}
                                                    setFormData={setFormData} />
                                                  <div className='flex item-center gap-2 justify-end'>
                                                    <Button
                                                      variant='destructive'
                                                      className='gap-2'
                                                      type='button'
                                                      onClick={() => {
                                                        setIsEditAccounts((prev) => ({
                                                          ...prev,
                                                          [profile.id]: false
                                                        }));
                                                        setFormData({
                                                          handle: '',
                                                          followers: '',
                                                          niches: []
                                                        });
                                                        setCurrentPlatform('')
                                                      }}
                                                    >
                                                      <Ban className='w-4 h-4' />
                                                      Cancel
                                                    </Button>
                                                    <Button
                                                      variant="default"
                                                      className='gap-2'
                                                      type='submit'
                                                    >
                                                      {isEditLoding[profile.id] ? (
                                                        <Loader2 className='w-4 h-4 animate-spin' />
                                                      ) : (
                                                        <>
                                                          <Send className='w-4 h-4' />
                                                          Submit
                                                        </>
                                                      )}

                                                    </Button>
                                                  </div>
                                                </form>
                                              </PopoverContent>
                                            </Popover>

                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="group h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500"
                                              onClick={() => deleteSocialAccount(profile.id, platformKey)}
                                              disabled={isDeletingAccounts[profile.id]}
                                            >
                                              {isDeletingAccounts[profile.id] ? (
                                                <LoaderCircle className='w-4 h-4 animate-spin text-red' />
                                              ) : (
                                                <Trash2 className="w-4 h-4 group-hover:text-white " />
                                              )}

                                            </Button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <Button
                                      variant='default'
                                      className='w-1/2 mx-auto'
                                      onClick={() => {
                                        setToggleAddedDialog((prev) => ({
                                          ...prev,
                                          [platformKey]: true
                                        }));
                                        handleAddSocial(platformKey);
                                      }}
                                    >
                                      Add more
                                    </Button>
                                  </>
                                )}
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <Dialog open={open} onOpenChange={setOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="gap-2 border border-red-500"
                                  onClick={() => handleAddSocial(value)}
                                >
                                  <CirclePlus className="w-4 h-4 text-red-500" />
                                  <span className='text-red-500'>Add Profile</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[625px]">
                                <form onSubmit={submitSocialHandler}>
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <CirclePlus className="w-5 h-5 text-green-500" />
                                      {`Add ${currentPlatform} Profile`}
                                    </DialogTitle>
                                  </DialogHeader>

                                  <div className="grid gap-6 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="handle" className="text-right flex items-center gap-2">
                                        <Link2 className="w-4 h-4" />
                                        Handle
                                      </Label>
                                      <Input
                                        id="handle"
                                        value={formData.handle}
                                        onChange={handleInputChange}
                                        placeholder={`https://${currentPlatform.toLowerCase()}.com/you`}
                                        className="col-span-3"

                                      />
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="followers" className="text-right flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        Followers
                                      </Label>
                                      <Input
                                        id="followers"
                                        type="text"
                                        value={formData.followers}
                                        onChange={handleInputChange}
                                        placeholder="5000"
                                        className="col-span-3"
                                        required
                                      />
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="niche" className="text-right flex items-center gap-2">
                                        <Tag className="w-4 h-4" />
                                        Niche
                                      </Label>
                                      <div className="col-span-3">
                                        <Select
                                          isMulti
                                          name="niches"
                                          id="niches"
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
                                          value={formData.niches.map(interest => ({
                                            value: interest,
                                            label: interest.charAt(0).toUpperCase() + interest.slice(1).replace(/_/g, ' ')
                                          }))}
                                          onChange={(selected) => {
                                            setFormData(prev => ({
                                              ...prev,
                                              niches: selected ? selected.map(option => option.value) : []
                                            }));
                                          }}
                                          className="w-full"
                                          placeholder="Select niches (e.g. Fashion, Tech)..."
                                          classNamePrefix="select"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <DialogFooter>
                                    <Button
                                      type="submit"
                                      className="gap-2"
                                      disabled={isAdding}
                                    >
                                      {isAdding ? (
                                        <LoaderCircle className='animate-spin' />
                                      ) : (
                                        <>
                                          <CirclePlus className="w-4 h-4" />
                                          Add Profile
                                        </>
                                      )}
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                          )
                        ) : (
                          <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="gap-2"
                                onClick={() => handleAddSocial(value)}
                              >
                                <CirclePlus className="w-4 h-4 text-green-500" />
                                Add Social
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[625px]">
                              <form onSubmit={submitSocialHandler}>
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    <CirclePlus className="w-5 h-5 text-green-500" />
                                    {`Add ${currentPlatform} Profile`}
                                  </DialogTitle>
                                </DialogHeader>

                                <div className="grid gap-6 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="handle" className="text-right flex items-center gap-2">
                                      <Link2 className="w-4 h-4" />
                                      Handle
                                    </Label>
                                    <Input
                                      id="handle"
                                      value={formData.handle}
                                      onChange={handleInputChange}
                                      placeholder={`https://${currentPlatform.toLowerCase()}.com/you`}
                                      className="col-span-3"

                                    />
                                  </div>

                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="followers" className="text-right flex items-center gap-2">
                                      <Users className="w-4 h-4" />
                                      Followers
                                    </Label>
                                    <Input
                                      id="followers"
                                      type="text"
                                      value={formData.followers}
                                      onChange={handleInputChange}
                                      placeholder="5000"
                                      className="col-span-3"
                                      required
                                    />
                                  </div>

                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="niche" className="text-right flex items-center gap-2">
                                      <Tag className="w-4 h-4" />
                                      Niche
                                    </Label>
                                    <div className="col-span-3">
                                      <Select
                                        isMulti
                                        name="niches"
                                        id="niches"
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
                                        value={formData.niches.map(interest => ({
                                          value: interest,
                                          label: interest.charAt(0).toUpperCase() + interest.slice(1).replace(/_/g, ' ')
                                        }))}
                                        onChange={(selected) => {
                                          setFormData(prev => ({
                                            ...prev,
                                            niches: selected ? selected.map(option => option.value) : []
                                          }));
                                        }}
                                        className="w-full"
                                        placeholder="Select niches (e.g. Fashion, Tech)..."
                                        classNamePrefix="select"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <DialogFooter>
                                  <Button
                                    type="submit"
                                    className="gap-2"
                                    disabled={isAdding}
                                  >
                                    {isAdding ? (
                                      <LoaderCircle className='animate-spin' />
                                    ) : (
                                      <>
                                        <CirclePlus className="w-4 h-4" />
                                        Add Profile
                                      </>
                                    )}
                                  </Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </CollapsibleContent>
          </Collapsible>

        </Card>

      </div >
    </>
  );
}
