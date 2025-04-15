/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import advertiserService from '@/services/advertiser'
import { Toaster, toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import Loader from '@/components/layout/loader'

export default function PreferencesSettings() {
    const [isFetching, setIsFetching] = useState(true)
    const [isloading, setIsLoading] = useState({
        isEmailNotificationEnabled: false,
        isSmsNotificationEnabled: false,
        isPushNotificationEnabled: false
    })
    const [UsernotificationPreferences, setUserNotificationPreferences] = useState({
        isEmailNotificationEnabled: true,
        isSmsNotificationEnabled: true,
        isPushNotificationEnabled: true
    })

    useEffect(() => {
        // declaring function to get Advertiser notifications and campaign preferences
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
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsFetching(false)
            }
        };

        // calling the funtions to get user preferred notifications and campaign setting
        fetchData();

    }, [])

    // handler for all adveristers preferences(refactored)
    const updateUserPreferenceHandler = (handler: string) => async (checked: boolean) => {

        const key = `is${handler.charAt(0).toUpperCase() + handler.slice(1)}NotificationEnabled`;

        setIsLoading((prev) => ({
            ...prev,
            [key]: true
        }))
        try {
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
        } catch (error: unknown) {
            const responseError = error instanceof Error ? error.message : 'An Error occured'
            toast.error(responseError)
        } finally {
            setIsLoading((prev) => ({
                ...prev,
                [key]: false
            }))
        }
    }

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
                            <div className=" relative flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Email Notifications</p>
                                    <p className="text-sm text-gray-600">Receive campaign updates via email</p>
                                </div>

                                {isloading.isEmailNotificationEnabled ? (
                                    <Loader />
                                ) : (
                                    <Switch
                                        checked={UsernotificationPreferences.isEmailNotificationEnabled}
                                        onCheckedChange={updateUserPreferenceHandler('email')}
                                        disabled={isloading.isEmailNotificationEnabled}
                                    />
                                )}

                            </div>
                            <div className=" relative flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Sms Notifications</p>
                                    <p className="text-sm text-gray-600">Receive updates on your mobile phones</p>
                                </div>

                                {isloading.isSmsNotificationEnabled ? (
                                    <Loader />
                                ) : (
                                    <Switch
                                        checked={UsernotificationPreferences.isSmsNotificationEnabled}
                                        onCheckedChange={updateUserPreferenceHandler('sms')}
                                        disabled={isloading.isSmsNotificationEnabled}

                                    />
                                )}

                            </div>
                            <div className="relative flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Push Notifications</p>
                                    <p className="text-sm text-gray-600">Receive campaign updates on your device</p>
                                </div>
                                {isloading.isPushNotificationEnabled ? (
                                    <Loader />
                                ) : (
                                    <Switch
                                        checked={UsernotificationPreferences.isPushNotificationEnabled}
                                        onCheckedChange={updateUserPreferenceHandler('push')}
                                        disabled={isloading.isPushNotificationEnabled}
                                    />
                                )}

                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-6">Campaign Preferences</h2>
                        <div className="space-y-4">
                        </div>
                    </Card>



                </div>
            </div>
        </>
    )
}
