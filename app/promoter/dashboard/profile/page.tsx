"use client"

import { useEffect, useState } from "react"
import { Card, CardTitle, CardDescription, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Verified, Plus } from "lucide-react";
import { Calendar, DollarSign, Users, Pencil, Badge, Bell, BookmarkCheck, ArrowLeftRight } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveCampaignList } from '@/components/campaigns/active-campaigns'
import ProfileField from "@/components/advertiser/profile-field";
import { PromoterProfileCompletionChart } from "@/components/charts/promoter-chart";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"
import promoterService from "@/services/promoter"



export interface Promoter {
    accountDetails: string;
    audienceAge: string;
    audienceInterests: string[];
    companyName: string;
    contentTypes: string[];
    engagementRate: number;
    followersCount: number;
    fullName: string;
    location: string;
    paymentMethod: string;
    phoneNumber: string;
    platforms: string[];
    bio: string,
    companySize: string,
    website: '',
    profileCompletePercent: number
}

export default function PromoterProfile() {
    const [isLoading, setIsLoading] = useState(true)
    const [promoter, setPromoter] = useState<Promoter>({
        accountDetails: '',
        audienceAge: '',
        audienceInterests: [],
        companyName: '',
        contentTypes: [],
        engagementRate: 0,
        followersCount: 0,
        fullName: '',
        location: '',
        paymentMethod: '',
        phoneNumber: '',
        platforms: [],
        bio: '',
        companySize: '',
        website: '',
        profileCompletePercent: 0
    })

    useEffect(() => {
        const fetchPromoterData = async () => {
            try {
                const [profileData] = await Promise.all([
                    promoterService.getProfile(),
                ])

                setPromoter({
                    accountDetails: profileData?.user?.accountDetails || '',
                    audienceAge: profileData?.user?.audienceAge || '',
                    audienceInterests: profileData?.user?.audienceInterests || [],
                    companyName: profileData?.user?.companyName || '',
                    contentTypes: profileData?.user?.contentTypes || [],
                    engagementRate: profileData?.user?.engagementRate || 0,
                    followersCount: profileData?.user?.followersCount || 0,
                    fullName: profileData?.user?.fullName || '',
                    location: profileData?.user?.location || '',
                    paymentMethod: profileData?.user?.paymentMethod || '',
                    phoneNumber: profileData?.user?.phoneNumber || '',
                    platforms: profileData?.user?.platforms || [],
                    bio: profileData?.user?.bio,
                    companySize: profileData?.user?.companySize,
                    website: profileData?.user?.website,
                    profileCompletePercent: profileData?.user?.profileCompletedPercentage,
                })
            } catch (error) {
                console.error('Error fetching promoter data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPromoterData()
    }, [])

    if (isLoading) return <p>Fetching profile data</p>
    return (
        <>
            <div className="space-y-8 p-2">
                <Card className="shadow-md rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Button className="w-full sm:w-auto">Promotions</Button>
                        <Button variant="outline" className="w-full sm:w-auto">Manage Billing</Button>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="relative">
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500"></span>
                            </Button>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="p-0 rounded-full hover:bg-transparent">
                                    <div className="p-0.5 rounded-full" style={{ background: 'linear-gradient(to right, #8637e9, #f6627e)' }}>
                                        <Avatar className="cursor-pointer h-10 w-10 border-2 border-white">
                                            <AvatarImage />
                                            <AvatarFallback>
                                                {promoter.fullName.split(' ').filter(Boolean).map((item) => item.charAt(0).toUpperCase()).join('.')}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-4" align="end">
                                <div className="flex flex-col items-center space-y-3">
                                    <div className="p-0.5 rounded-full" style={{ background: 'linear-gradient(to right, #8637e9, #f6627e)' }}>
                                        <Avatar className="h-16 w-16 border-2 border-white">
                                            <AvatarImage />
                                            <AvatarFallback className="text-xl">
                                                {promoter.fullName.split(' ').filter(Boolean).map((item) => item.charAt(0).toUpperCase()).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">Hello,</p>
                                        <p className="font-medium">{promoter.fullName}</p>
                                    </div>

                                    <div className="w-full border-t"></div>

                                    <div className="w-full space-y-1">
                                        <Link href="/advertiser/dashboard/settings/profile" className="w-full">
                                            <Button variant="ghost" className="w-full justify-start">
                                                <Pencil className="w-4 h-4 mr-2" />
                                                Edit Profile
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" className="w-full justify-start">
                                            <Badge className="w-4 h-4 mr-2" />
                                            Account Settings
                                        </Button>
                                        <Button variant="ghost" className="w-full justify-start">
                                            <ArrowLeftRight className="w-4 h-4 mr-2" />
                                            Transactions
                                        </Button>
                                        <div className="w-full border-t pt-1"></div>
                                        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500">
                                            Sign Out
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <div className="hidden sm:block">
                            <div className="flex items-center gap-1">
                                <CardTitle className="flex items-center justify-center gap-1">
                                    {promoter.fullName.split(' ')[0].charAt(0).toUpperCase() + promoter.fullName.split(' ')[0].slice(1)}
                                    <Verified className="text-amber-500 h-[1em] w-[1em] relative top-[0.1em]" />
                                </CardTitle>
                            </div>
                            <div>
                                <CardDescription className="font-medium">{promoter.fullName.charAt(0).toUpperCase() + promoter.fullName.slice(1)}</CardDescription>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="w-full md:w-60 flex justify-center md:justify-start">
                        <PromoterProfileCompletionChart percentage={promoter.profileCompletePercent} userData={promoter} />
                    </div>
                    <Card className="py-4 flex-1">
                        <CardHeader className="flex flex-col sm:flex-row justify-between items-start space-y-2 sm:space-y-0">
                            <div>
                                <CardTitle>Profile Overview</CardTitle>
                                <CardDescription>Promoter account information</CardDescription>
                            </div>
                            <Link href="/promoter/dashboard/settings/profile">
                                <Button variant="link" size="sm" className="px-0 sm:px-2">
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </Link>
                        </CardHeader>

                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-500">Personal Information</h3>
                                <div className="space-y-2">
                                    <ProfileField label="Full Name" value={promoter.fullName} />
                                    <ProfileField label="Account Details" value={promoter.accountDetails} />
                                    <ProfileField label="Phone" value={promoter.phoneNumber} />
                                    <ProfileField label="Location" value={promoter.location} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-500">Professional Information</h3>
                                <div className="space-y-2">
                                    <ProfileField label="Company Name" value={promoter.companyName} />
                                    <ProfileField label="Followers" value={promoter.followersCount?.toLocaleString()} />
                                    <ProfileField label="Engagement Rate" value={`${promoter.engagementRate}%`} />
                                    <ProfileField label="Payment Method" value={promoter.paymentMethod} />
                                </div>
                            </div>


                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-500">Audience Information</h3>
                                <div className="space-y-2">
                                    <ProfileField label="Target Age" value={promoter.audienceAge} />
                                </div>
                            </div>


                            <div className="col-span-full space-y-4">
                                <h3 className="text-sm font-medium text-gray-500">Platforms</h3>
                                <div className="flex flex-wrap gap-2">
                                    {promoter.platforms?.length > 0 ? (
                                        promoter.platforms.map((platform, index) => (
                                            <span key={index} className="px-3 py-1 text-sm rounded-full bg-gray-100">
                                                {platform}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-400">No platforms specified</p>
                                    )}
                                </div>
                            </div>

                            <div className="col-span-full space-y-4">
                                <h3 className="text-sm font-medium text-gray-500">Content Types</h3>
                                <div className="flex flex-wrap gap-2">
                                    {promoter.contentTypes?.length > 0 ? (
                                        promoter.contentTypes.map((type, index) => (
                                            <span key={index} className="px-3 py-1 text-sm rounded-full bg-gray-100">
                                                {type}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-400">No content types specified</p>
                                    )}
                                </div>
                            </div>

                            <div className="col-span-full space-y-4">
                                <h3 className="text-sm font-medium text-gray-500">Audience Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    {promoter.audienceInterests?.length > 0 ? (
                                        promoter.audienceInterests.map((interest, index) => (
                                            <span key={index} className="px-3 py-1 text-sm rounded-full bg-gray-100">
                                                {interest}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-400">No interests specified</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* <Tabs defaultValue="account" className="w-full">
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0">
                        <TabsTrigger value="promotion" className="w-full">Active Promotions</TabsTrigger>
                        <TabsTrigger value="brand" className="w-full">Brands</TabsTrigger>
                        <TabsTrigger value="overview" className="w-full">Overview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="mt-4">
                        <Card className="p-4">

                        </Card>
                    </TabsContent>
                    <TabsContent value="password" className="mt-4">
                        <Card className="p-4">

                        </Card>
                    </TabsContent>
                    <TabsContent value="overview" className="mt-4">
                        <Card className="p-4">

                        </Card>
                    </TabsContent>
                </Tabs> */} 
            </div>
        </>
    )
}