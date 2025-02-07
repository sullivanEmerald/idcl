'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ProfileSettings() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="mt-2 text-gray-600">Manage your personal information</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <Input type="text" placeholder="Enter your full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input type="email" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <Input type="tel" placeholder="Enter your phone number" />
            </div>
            <Button>Save Changes</Button>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Social Media Accounts</h2>
          {/* Social media account links will go here */}
        </Card>
      </div>
    </div>
  )
}
