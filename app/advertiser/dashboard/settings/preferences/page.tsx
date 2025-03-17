/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import advertiserService from '@/services/advertiser'
import userService from '@/services/user'
import { Toaster, toast } from 'sonner'
import { useEffect, useState } from 'react'

export default function PreferencesSettings() {

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
                    userService.getProfile(),
                    () => { }
                ]);

                console.log('preferences', userNotificationsSetting)

                // setting user specific notications from returned data
                setUserNotificationPreferences({
                    isEmailNotificationEnabled: userNotificationsSetting?.isEmailNotification,
                    isSmsNotificationEnabled: userNotificationsSetting?.isSmsNotification,
                    isPushNotificationEnabled: userNotificationsSetting?.isSmsNotification,
                })

                console.log(userNotificationsSetting, userCampaignSetting);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // calling the funtions to get user preferred notifications and campaign setting
        fetchData();

    }, [])

    // handle for updating user email notification
    const updateUserEmailNoficationHandler = async (checked: boolean) => {
        console.log(checked)
        try {
            const data = await advertiserService.updateEmailPreference({ isEmailNotificationEnabled: checked })

            if (data) {
                setUserNotificationPreferences((prev) => ({
                    ...prev,
                    isEmailNotificationEnabled: checked
                }))
            }
            toast.success(checked ? 'email notification enabled' : 'email notifation disabled')
            console.log(data)
        } catch (error: any) {
            const responseError = error.response?.data?.message || 'An Error occured'
            toast.error(responseError)
        }
    }

    // handle for updating user sms notificaton
    const updateUserSmsNoficationHandler = async (checked: boolean) => {
        console.log(checked)
        try {
            const data = await advertiserService.updateSmsPreference({ isSmsNotificationEnabled: checked })
            console.log(data)
            if (data) {
                setUserNotificationPreferences((prev) => ({
                    ...prev,
                    isSmsNotificationEnabled: checked
                }))
            }
            toast.success(checked ? 'sms notification enabled' : 'sms notifation disabled')
        } catch (error: any) {
            const responseError = error.response?.data?.message || 'An Error occured'
            toast.error(responseError)
        }
    }

    // handle for updating user push notificaton
    const updateUserPushNoficationHandler = async (checked: boolean) => {
        console.log(checked)
        try {
            const data = await advertiserService.updatePushPreference({ isPushsNotificationEnabled: checked })
            console.log(data)
            if (data) {
                setUserNotificationPreferences((prev) => ({
                    ...prev,
                    isPushNotificationEnabled: checked
                }))
            }
            toast.success(checked ? 'Push notification enabled' : 'Push notifation disabled')
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
                                    onCheckedChange={updateUserEmailNoficationHandler}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Sms Notifications</p>
                                    <p className="text-sm text-gray-600">Receive updates on your mobile phones</p>
                                </div>
                                <Switch
                                    checked={UsernotificationPreferences.isSmsNotificationEnabled}
                                    onCheckedChange={updateUserSmsNoficationHandler}

                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Push Notifications</p>
                                    <p className="text-sm text-gray-600">Receive campaign updates on your device</p>
                                </div>
                                <Switch
                                    checked={UsernotificationPreferences.isPushNotificationEnabled}
                                    onCheckedChange={updateUserPushNoficationHandler}
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-6">Campaign Preferences</h2>
                        <div className="space-y-4">
                            {/* Campaign preferences will go here */}
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}
