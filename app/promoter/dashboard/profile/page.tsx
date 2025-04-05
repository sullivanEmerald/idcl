"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import Link from "next/link"
import promoterService from "@/services/promoter"
import ProfileField from "@/components/advertiser/profile-field";



interface Promoter {
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
}

export default function PromoterProfile() {
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
        companySize: ''
    })

    useEffect(() => {
        const fetchPromoterData = async () => {
            try {
                const [profileData] = await Promise.all([
                    promoterService.getProfile(),
                ])

                console.log(profileData)
                setPromoter({
                    accountDetails: profileData?.accountDetails || '',
                    audienceAge: profileData?.audienceAge || '',
                    audienceInterests: profileData?.audienceInterests || [],
                    companyName: profileData?.companyName || '',
                    contentTypes: profileData?.contentTypes || [],
                    engagementRate: profileData?.engagementRate || 0,
                    followersCount: profileData?.followersCount || 0,
                    fullName: profileData?.fullName || '',
                    location: profileData?.location || '',
                    paymentMethod: profileData?.paymentMethod || '',
                    phoneNumber: profileData?.phoneNumber || '',
                    platforms: profileData?.platforms || [],
                    bio: profileData?.bio,
                    companySize: profileData?.companySize
                })
            } catch (error) {
                console.error('Error fetching promoter data:', error)
            }
        }

        fetchPromoterData()
    }, [])

    return (
        <Card className="p-4">
            <CardHeader className="flex flex-row justify-between items-start space-y-0">
                <div>
                    <CardTitle>Profile Overview</CardTitle>
                    <CardDescription>Promoter account information</CardDescription>
                </div>
                <Link href="/promoter/dashboard/settings/profile">
                    <Button variant="link" size="sm">
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                </Link>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
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
    )
}