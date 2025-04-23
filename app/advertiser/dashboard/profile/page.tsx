"use client"
import advertiserService, { Campaign } from "@/services/advertiser";
import { useEffect, useState } from "react"
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Verified } from "lucide-react";
import { Calendar, DollarSign, Users, Pencil, Badge, Bell } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveCampaignList } from '@/components/campaigns/active-campaigns'
import ProfileField from "@/components/advertiser/profile-field";
import ProfileSkeleton from "@/components/advertiser/skeleton";
import { ProfileCompletionPie } from "@/components/charts/advertiser-chart";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import Link from 'next/link'



interface TargetAudience {
    value: string;
    label?: string
}

export interface Advertiser {
    fullName: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    billingAddress: string;
    billingEmail: string;
    businessType: string;
    companySize: string;
    goals: string;
    industry: string;
    targetAudience: string[];
    website: string;
    profilePercentage: number
}


export default function Profile() {
    const [isfetching, setIsFetching] = useState(true)
    const [Advertisercampaigns, setCampaigns] = useState<Campaign[]>([])
    const [advertiser, setAdvertiser] = useState<Advertiser>({
        fullName: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        billingAddress: '',
        billingEmail: '',
        businessType: '',
        companySize: '',
        goals: '',
        industry: '',
        targetAudience: [],
        website: '',
        profilePercentage: 0
    });

    useEffect(() => {
        const getAdvertiserData = async () => {
            try {
                // getting advertiser profile and campaigns
                const [advertiserData, { campaigns }] = await Promise.all([
                    advertiserService.getProfile(),
                    advertiserService.getCampaigns()
                ])

                console.log(advertiserData.profileCompletedPercentage)

                // setting profile informations
                setAdvertiser({
                    fullName: advertiserData?.fullName,
                    email: advertiserData?.email,
                    phoneNumber: advertiserData?.phoneNumber,
                    companyName: advertiserData?.companyName,
                    billingAddress: advertiserData?.billingAddress,
                    billingEmail: advertiserData?.billingEmail,
                    businessType: advertiserData?.businessType,
                    companySize: advertiserData?.companySize,
                    goals: advertiserData?.goals,
                    industry: advertiserData?.industry,
                    targetAudience: advertiserData?.targetAudience.map((item: TargetAudience) => item.value),
                    website: advertiserData?.website,
                    profilePercentage: advertiserData?.profileCompletedPercentage
                })

                // setting campaigns
                setCampaigns(campaigns)
            } catch (error) {
                console.error('error', error)
            } finally {
                setIsFetching(false)
            }
        }

        getAdvertiserData();
    }, [])

    if (isfetching) return <ProfileSkeleton />;
    if (!Advertisercampaigns || !advertiser) return <p className="text-crimson-500">No Data found</p>



    const activeCampaigns = Advertisercampaigns.filter((item) => item.status === 'active')
    const scheduledCampaigns = Advertisercampaigns.filter((item) => item.status.trim() === 'scheduled')
    const totalReach = Advertisercampaigns.reduce((acc, c) => acc + c.metrics.totalReach, 0)
    const totalBudget = Advertisercampaigns.reduce((acc, c) => acc + c.budget, 0)
    const averageEngagementRate = activeCampaigns.length
        ? activeCampaigns.reduce((sum, c) => sum + c.metrics.averageEngagementRate, 0) / activeCampaigns.length
        : 0
    return (
        <>
            <div className="space-y-8 p-8">
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between gap-6">
                    <div className="flex gap-4">
                        {/* <Link href="/advertiser/dashboard/campaigns/create">
                            <Button>Create Campaign</Button>
                        </Link> */}
                        <Button variant="outline">Manage Billing</Button>
                    </div>
                    <div className="flex items-center gap-4">
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
                                                {advertiser.fullName.split(' ').filter(Boolean).map((item) => item.charAt(0).toUpperCase()).join('.')}
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
                                                {advertiser.fullName.split(' ').filter(Boolean).map((item) => item.charAt(0).toUpperCase()).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">Hello,</p>
                                        <p className="font-medium">{advertiser.fullName}</p>
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
                                            <DollarSign className="w-4 h-4 mr-2" />
                                            Billing
                                        </Button>
                                        <div className="w-full border-t pt-1"></div>
                                        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500">
                                            Sign Out
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <div className="">
                            <div className="flex items-center gap-1">
                                <CardTitle className="flex items-center justify-center gap-1">
                                    {advertiser.fullName.split(' ')[0].charAt(0).toUpperCase() + advertiser.fullName.split(' ')[0].slice(1)}
                                    <Verified className="text-amber-500 h-[1em] w-[1em] relative top-[0.1em]" />
                                </CardTitle>
                            </div>
                            <div>
                                <CardDescription className="font-medium">{advertiser.industry.charAt(0).toUpperCase() + advertiser.industry.slice(1)}</CardDescription>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 min-h-[600px]"> {/* Added min-height */}
                    {/* Profile Completion Pie */}
                    <div className="w-full md:w-60 flex-shrink-0"> {/* Prevent shrinking */}
                        <ProfileCompletionPie percentage={advertiser.profilePercentage} userData={advertiser} />
                    </div>

                    {/* Profile Card */}
                    <Card className="p-4 flex-1 min-w-0"> {/* Allow growth but prevent overflow */}
                        <CardHeader className="flex flex-row justify-between items-start space-y-0">
                            <div>
                                <CardTitle>Profile overview</CardTitle>
                                <CardDescription>Advertiser basic information</CardDescription>
                            </div>
                            <Link href="/advertiser/dashboard/settings/profile">
                                <Button variant="link" size="sm">
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </Link>
                        </CardHeader>

                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 overflow-auto"> {/* Added overflow */}
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-500">Personal Information</h3>
                                <div className="space-y-2">
                                    <ProfileField label="Full Name" value={advertiser.fullName} />
                                    <ProfileField label="Email" value={advertiser.email} />
                                    <ProfileField label="Phone" value={advertiser.phoneNumber} />
                                </div>
                            </div>

                            {/* Company Information */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-500">Company Information</h3>
                                <div className="space-y-2">
                                    <ProfileField label="Company Name" value={advertiser.companyName} />
                                    <ProfileField label="Business Type" value={advertiser.businessType} />
                                    <ProfileField label="Company Size" value={advertiser.companySize} />
                                    <ProfileField label="Industry" value={advertiser.industry} />
                                </div>
                            </div>

                            {/* Billing & Goals */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-500">Billing & Goals</h3>
                                <div className="space-y-2">
                                    <ProfileField label="Billing Address" value={advertiser.billingAddress} />
                                    <ProfileField label="Billing Email" value={advertiser.billingEmail} />
                                    <ProfileField label="Website" value={advertiser.website} />
                                    <ProfileField label="Goals" value={advertiser.goals} />
                                </div>
                            </div>

                            {/* Target Audience - full width */}
                            <div className="col-span-full space-y-4">
                                <h3 className="text-sm font-medium text-gray-500">Target Audience</h3>
                                <div className="flex flex-wrap gap-2">
                                    {advertiser.targetAudience?.length > 0 ? (
                                        advertiser.targetAudience.map((audience, index) => (
                                            <span key={index} className="px-3 py-1 text-sm rounded-full bg-gray-100">
                                                {audience}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-400">No target audience specified</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="space-y-6 p-4">
                    <CardHeader>
                        <CardTitle>Campaign overview</CardTitle>
                        <CardDescription>Advertiser campaign summary</CardDescription>
                    </CardHeader>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Budget</p>
                                    <p className="text-2xl font-bold">${totalBudget.toLocaleString()}</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <Users className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Reach</p>
                                    <p className="text-2xl font-bold">{totalReach.toLocaleString()}</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <Calendar className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Active Campaigns</p>
                                    <p className="text-2xl font-bold">{activeCampaigns.length}</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-yellow-100 rounded-lg">
                                    <Users className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Avg. Engagement Rate</p>
                                    <p className="text-2xl font-bold">{(averageEngagementRate * 100).toFixed(1)}%</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="p-6">
                        <Tabs defaultValue="active" className="w-full">
                            <TabsList className="w-full">
                                <TabsTrigger value="active" className="flex-1">Active Campaigns</TabsTrigger>
                                <TabsTrigger value="scheduled" className="flex-1">Scheduled Campaigns</TabsTrigger>
                            </TabsList>
                            <TabsContent value="active" >
                                <Card className="overflow-hidden border-t-4 border-t-blue-500">
                                    <div className="border-b p-6">
                                        <h2 className="text-xl font-semibold">Active Campaigns</h2>
                                        <p className="mt-1 text-sm text-gray-600">Your active campaigns</p>
                                    </div>
                                    {!activeCampaigns || activeCampaigns.length === 0 ? (
                                        <p>There are no active campaigns</p>
                                    ) : (
                                        activeCampaigns.map((activeCampaign) => (
                                            <ActiveCampaignList
                                                key={activeCampaign.id}
                                                campaign={activeCampaign}
                                                isActive={true}
                                            />
                                        ))
                                    )}
                                </Card>
                            </TabsContent>
                            <TabsContent value="scheduled">
                                <Card className="overflow-hidden border-t-4 border-t-blue-500">
                                    <div className="border-b p-6">
                                        <h2 className="text-xl font-semibold">Scheduled Campaigns</h2>
                                        <p className="mt-1 text-sm text-gray-600">Your scheduled campaigns</p>
                                    </div>
                                    <div className="p-6">
                                        {!scheduledCampaigns || scheduledCampaigns.length === 0 ? (
                                            <p>There is no scheduled campaign</p>
                                        ) : (
                                            scheduledCampaigns.map((scheduledCampaign) => (
                                                <ActiveCampaignList
                                                    key={scheduledCampaign.id}
                                                    campaign={scheduledCampaign}
                                                    isActive={false}
                                                />
                                            ))
                                        )}
                                    </div>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </Card>
            </div>
        </>
    )
}
