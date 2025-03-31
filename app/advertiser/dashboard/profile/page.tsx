"use client"
import advertiserService from "@/services/advertiser";
import { useEffect, useState } from "react"
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Verified, Plus } from "lucide-react";
import { Calendar, DollarSign, Users, Pencil, Badge } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveCampaignList } from '@/components/campaigns/active-campaigns'
import ProfileField from "@/components/advertiser/profile-field";
import Link from 'next/link'


interface Campaign {
    id: string
    title: string
    status: string
    budget: number
    metrics: {
        totalReach: number
        totalEngagements: number
        totalPosts: number
        averageEngagementRate: number
    }
    startDate: Date
    endDate: Date
}

interface TargetAudience {
    value: string;
    label?: string
}

interface Advertiser {
    fullname: string;
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
}


export default function Profile() {
    const [Advertisercampaigns, setCampaigns] = useState<Campaign[]>([])
    const [advertiser, setAdvertiser] = useState<Advertiser>({
        fullname: '',
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
        website: ''
    });
    useEffect(() => {
        const getAdvertiserData = async () => {

            const [advertiserData, { campaigns }] = await Promise.all([
                advertiserService.getProfile(),
                advertiserService.getCampaigns()
            ])

            // setting profile informations
            setAdvertiser({
                fullname: advertiserData?.fullName,
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
                website: advertiserData?.website
            })

            // setting campaigns
            setCampaigns(campaigns)
        }

        getAdvertiserData();
    }, [])


    console.log(advertiser.targetAudience)

    const activeCampaigns = Advertisercampaigns.filter((item) => item.status === 'active')
    const isActive = Advertisercampaigns.some((item) => item.status.trim() === 'active')
    const scheduledCampaigns = Advertisercampaigns.filter((item) => item.status.trim() === 'scheduled')
    const totalReach = Advertisercampaigns.reduce((acc, c) => acc + c.metrics.totalReach, 0)
    const totalBudget = Advertisercampaigns.reduce((acc, c) => acc + c.budget, 0)
    const totalEngagements = Advertisercampaigns.reduce((acc, c) => acc + c.metrics.totalEngagements, 0)
    const averageEngagementRate = activeCampaigns.length
        ? activeCampaigns.reduce((sum, c) => sum + c.metrics.averageEngagementRate, 0) / activeCampaigns.length
        : 0

    return (
        <>
            <div className="space-y-8 p-8">
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between gap-6">
                    <div className="flex gap-4">
                        <Link href="/advertiser/dashboard/campaigns/create">
                            <Button>Create Campaign</Button>
                        </Link>
                        <Button variant="outline">Manage Billing</Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div>
                            <Button variant='success' className="flex gap-2 items-center justify-start ">
                                <Plus strokeWidth={2.5} />
                                <span>Add Funds</span>
                            </Button>
                        </div>
                        <Avatar>
                            <AvatarImage />
                            <AvatarFallback>
                                {advertiser.fullname.split(' ').filter(Boolean).map((item) => item.charAt(0).toUpperCase()).join('.')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="">
                            <div className="flex items-center gap-1">
                                <CardTitle className="flex items-center justify-center gap-1">
                                    {advertiser.fullname.split(' ')[0]}
                                    <Verified className="text-amber-500 h-[1em] w-[1em] relative top-[0.1em]" />
                                </CardTitle>
                            </div>
                            <div>
                                <CardDescription className="font-medium">{advertiser.industry}</CardDescription>
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="p-4">
                    <CardHeader className="flex flex-row justify-between items-start space-y-0">
                        <div>
                            <CardTitle>Profile overview</CardTitle>
                            <CardDescription>Advertiser basic information</CardDescription>
                        </div>
                        <Button variant="link" size="sm" onClick={() => {/* Edit handler */ }}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-500">Personal Information</h3>
                            <div className="space-y-2">
                                <ProfileField label="Full Name" value={advertiser.fullname} />
                                <ProfileField label="Email" value={advertiser.email} />
                                <ProfileField label="Phone" value={advertiser.phoneNumber} />
                            </div>
                        </div>


                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-500">Company Information</h3>
                            <div className="space-y-2">
                                <ProfileField label="Company Name" value={advertiser.companyName} />
                                <ProfileField label="Business Type" value={advertiser.businessType} />
                                <ProfileField label="Company Size" value={advertiser.companySize} />
                                <ProfileField label="Industry" value={advertiser.industry} />
                            </div>
                        </div>


                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-500">Billing & Goals</h3>
                            <div className="space-y-2">
                                <ProfileField label="Billing Address" value={advertiser.billingAddress} />
                                <ProfileField label="Billing Email" value={advertiser.billingEmail} />
                                <ProfileField label="Website" value={advertiser.website} />
                                <ProfileField label="Goals" value={advertiser.goals} />
                            </div>
                        </div>


                        <div className="col-span-full space-y-4">
                            <h3 className="text-sm font-medium text-gray-500">Target Audience</h3>
                            <div className="flex flex-wrap gap-2">
                                {advertiser.targetAudience?.length > 0 ? (
                                    advertiser.targetAudience.map((audience, index) => (
                                        <>
                                            <p>{audience}</p>
                                        </>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400">No target audience specified</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

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
                                    <div className="p-6">
                                        <ActiveCampaignList campaigns={activeCampaigns} isActive={isActive} />
                                    </div>
                                </Card>
                            </TabsContent>
                            <TabsContent value="scheduled">
                                <Card className="overflow-hidden border-t-4 border-t-blue-500">
                                    <div className="border-b p-6">
                                        <h2 className="text-xl font-semibold">Scheduled Campaigns</h2>
                                        <p className="mt-1 text-sm text-gray-600">Your scheduled campaigns</p>
                                    </div>
                                    <div className="p-6">
                                        <ActiveCampaignList campaigns={scheduledCampaigns} isActive={!isActive} />
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
