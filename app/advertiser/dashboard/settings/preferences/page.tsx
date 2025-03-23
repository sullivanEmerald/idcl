/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import advertiserService from '@/services/advertiser'
import { Toaster, toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function PreferencesSettings() {
    const [isFetching, setIsFetching] = useState(true)
    const [UsernotificationPreferences, setUserNotificationPreferences] = useState({
        isEmailNotificationEnabled: true,
        isSmsNotificationEnabled: true,
        isPushNotificationEnabled: true
    })

    useEffect(() => {
        // declaring function to get user notication prompts and campaign prompts
        const fetchData = async () => {

            try {
                const [userNotificationsSetting, userCampaignSetting] = await Promise.all([
                    advertiserService.getProfile(),
                    () => { }
                ]);

                console.log('preferences', userNotificationsSetting)

                // setting user specific notications from returned data
                setUserNotificationPreferences({
                    isEmailNotificationEnabled: userNotificationsSetting?.isEmailNotification,
                    isSmsNotificationEnabled: userNotificationsSetting?.isSmsNotification,
                    isPushNotificationEnabled: userNotificationsSetting?.isPushNotification,
                })

                console.log(userNotificationsSetting, userCampaignSetting);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsFetching(false)
            }
        };

        // calling the funtions to get user preferred notifications and campaign setting
        fetchData();

    }, [])

    if (isFetching) {
        return (
            <div className='space-y-8 p-8'>
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>

                <div className="grid gap-6">
                    <div className="p-6 border rounded-lg">
                        <Skeleton className="h-6 w-48 mb-6" />
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Skeleton className="h-5 w-32 mb-1" />
                                    <Skeleton className="h-4 w-48" />
                                </div>
                                <Skeleton className="h-6 w-10 rounded-full" />
                            </div>

                            {/* SMS Notifications Skeleton */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <Skeleton className="h-5 w-32 mb-1" />
                                    <Skeleton className="h-4 w-48" />
                                </div>
                                <Skeleton className="h-6 w-10 rounded-full" />
                            </div>

                            {/* Push Notifications Skeleton */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <Skeleton className="h-5 w-32 mb-1" />
                                    <Skeleton className="h-4 w-48" />
                                </div>
                                <Skeleton className="h-6 w-10 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // handler for all adveristers preferences(refactored)
    const updateUserPreferenceHandler = (handler: string) => async (checked: boolean) => {
        console.log(checked)
        console.log(handler)
        try {
            const key = `is${handler.charAt(0).toUpperCase() + handler.slice(1)}NotificationEnabled`;
            const data = await advertiserService.updatePreference({
                [key]: checked,
            } as { [key: string]: boolean; });

            if (data) {
                setUserNotificationPreferences((prev) => ({
                    ...prev,
                    [key]: checked
                }))
            }
            toast.success(checked ? `${handler} notification enabled` : `${handler} notification disabled`)
            console.log(data)
        } catch (error: any) {
            const responseError = error.response?.data?.message || 'An Error occured'
            toast.error(responseError)
        }
    }

    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="space-y-8 p-8">
                <div>
                    <h1 className="text-3xl font-bold">Preferences</h1>
                    <p className="mt-2 text-gray-600">Customize your account settings</p>
                </div>

                <div className="grid gap-6">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Email Notifications</p>
                                    <p className="text-sm text-gray-600">Receive campaign updates via email</p>
                                </div>
                                <Switch
                                    checked={UsernotificationPreferences.isEmailNotificationEnabled}
                                    onCheckedChange={updateUserPreferenceHandler('email')}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Sms Notifications</p>
                                    <p className="text-sm text-gray-600">Receive updates on your mobile phones</p>
                                </div>
                                <Switch
                                    checked={UsernotificationPreferences.isSmsNotificationEnabled}
                                    onCheckedChange={updateUserPreferenceHandler('sms')}

                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Push Notifications</p>
                                    <p className="text-sm text-gray-600">Receive campaign updates on your device</p>
                                </div>
                                <Switch
                                    checked={UsernotificationPreferences.isPushNotificationEnabled}
                                    onCheckedChange={updateUserPreferenceHandler('push')}
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-6">Campaign Preferences</h2>
                        <div className="space-y-4">
                            {/* Target Audience - Dropdown */}
                            <div>
                                <p className="font-medium">Target Audience</p>
                                <p className="text-sm text-gray-600">Select demographics, age range, and interests</p>
                                <select className="w-full mt-2 border rounded p-2">
                                    <option value="18-24">18-24</option>
                                    <option value="25-34">25-34</option>
                                    <option value="35-44">35-44</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>

                            {/* Budget Allocation - Number Input */}
                            <div>
                                <p className="font-medium">Budget Allocation</p>
                                <p className="text-sm text-gray-600">Set a daily, weekly, or total budget</p>
                                <input type="number" className="w-full mt-2 border rounded p-2" placeholder="Enter budget" />
                            </div>

                            {/* Ad Scheduling - Date/Time Picker */}
                            <div>
                                <p className="font-medium">Ad Scheduling</p>
                                <p className="text-sm text-gray-600">Choose specific days and times to display ads</p>
                                <input type="datetime-local" className="w-full mt-2 border rounded p-2" />
                            </div>

                            {/* Ad Placement - Dropdown */}
                            <div>
                                <p className="font-medium">Ad Placement</p>
                                <p className="text-sm text-gray-600">Select web, mobile, social media, or app placements</p>
                                <select className="w-full mt-2 border rounded p-2">
                                    <option value="web">Web</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="social">Social Media</option>
                                    <option value="app">App</option>
                                </select>
                            </div>

                            {/* Geotargeting - Toggle */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Geotargeting</p>
                                    <p className="text-sm text-gray-600">Select specific countries, regions, or cities</p>
                                </div>
                                <Switch />
                            </div>

                            {/* Campaign Objective - Dropdown */}
                            <div>
                                <p className="font-medium">Campaign Objective</p>
                                <p className="text-sm text-gray-600">Define the purpose (brand awareness, sales, etc.)</p>
                                <select className="w-full mt-2 border rounded p-2">
                                    <option value="awareness">Brand Awareness</option>
                                    <option value="leads">Generate Leads</option>
                                    <option value="sales">Drive Sales</option>
                                </select>
                            </div>

                            {/* Ad Approval - Toggle */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Ad Approval</p>
                                    <p className="text-sm text-gray-600">Enable or disable manual approval before publishing</p>
                                </div>
                                <Switch />
                            </div>

                            {/* Notification Settings - Toggle */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Notification Settings</p>
                                    <p className="text-sm text-gray-600">Receive updates on ad performance and approvals</p>
                                </div>
                                <Switch />
                            </div>
                        </div>
                    </Card>



                </div>
            </div>
        </>
    )
}
