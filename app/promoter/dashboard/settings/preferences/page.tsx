/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

export default function PreferencesSettings() {
  return (
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
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-600">Receive updates on your device</p>
              </div>
              <Switch />
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
  )
}
