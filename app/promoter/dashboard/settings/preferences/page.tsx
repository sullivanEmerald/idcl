/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import promoterService from '@/services/promoter'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'


export default function PreferencesSettings() {
  const [isFetching, setIsFetching] = useState(true)
  const [promoterNotificationPreferences, setPromoterNotification] = useState({
    isEmailNotificationEnabled: true,
    isSmsNotificationEnabled: true,
    isPushNotificationEnabled: true
  })

  useEffect(() => {
    // declaring function to get promoter notication prompts and promoter campaign preferences
    const getUser = async () => {
      try {
        const [promoterNotificationPreferences, promoterCampaignPreferences] = await Promise.all([
          promoterService.getProfile(),
          () => { },
        ])

        // setting the preferences to the UI
        setPromoterNotification({
          isEmailNotificationEnabled: promoterNotificationPreferences?.user?.isEmailNotificationEnabled,
          isSmsNotificationEnabled: promoterNotificationPreferences?.user?.isSmsNotificationEnabled,
          isPushNotificationEnabled: promoterNotificationPreferences?.user?.isPushNotificationEnabled,
        })
      } catch (error) {
        console.error('error', error)
      } finally {
        setIsFetching(false)
      }
    }

    // calling the function
    getUser();

  }, [])

  // Handler to change promoter preference(s)
  const updatePromoterPreferenceHandler = (handler: string) => async (checked: boolean) => {
    try {
      const key = `is${handler.charAt(0).toUpperCase() + handler.slice(1)}NotificationEnabled`;

      const data = await promoterService.updatePromoterPreference({
        [key]: checked
      } as { [key: string]: boolean })

      console.log(data)

      if (data) {
        setPromoterNotification((prev) => ({
          ...prev,
          [key]: checked
        }))
      }
      toast.success(checked ? `${handler} is enabled` : `${handler} is disabled`)
    } catch (error) {
      console.error('error', error)
    }
  }

  if (isFetching) {
    return (
      <>
        <div className="space-y-8 p-8">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>

          <div className="grid gap-6">
            <Card className="p-6">
              <Skeleton className="h-6 w-40 mb-6" />
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48 mt-1" />
                    </div>
                    <Skeleton className="h-6 w-12 rounded-full" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <Skeleton className="h-6 w-40 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </Card>
          </div>
        </div>
      </>
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive campaign updates via email</p>
                </div>
                <Switch
                  checked={promoterNotificationPreferences.isEmailNotificationEnabled}
                  onCheckedChange={updatePromoterPreferenceHandler('email')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sms Notifications</p>
                  <p className="text-sm text-gray-600">Receive campaign updates via sms</p>
                </div>
                <Switch
                  checked={promoterNotificationPreferences.isSmsNotificationEnabled}
                  onCheckedChange={updatePromoterPreferenceHandler('sms')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates on your device</p>
                </div>
                <Switch
                  checked={promoterNotificationPreferences.isPushNotificationEnabled}
                  onCheckedChange={updatePromoterPreferenceHandler('push')}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Promoter Preferences</h2>
            <div className="space-y-4">
              {/* Campaign preferences will go here */}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
