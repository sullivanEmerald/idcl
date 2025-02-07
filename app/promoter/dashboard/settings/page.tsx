'use client'

import { Card } from '@/components/ui/card'

export default function PromoterSettings() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account preferences</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Account Settings</h2>
          {/* Add settings form here */}
        </Card>
      </div>
    </div>
  )
}
