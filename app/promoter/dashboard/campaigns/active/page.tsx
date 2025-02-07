'use client'

import { Card } from '@/components/ui/card'

export default function ActiveCampaigns() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Active Campaigns</h1>
        <p className="mt-2 text-gray-600">Manage your ongoing campaigns</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          {/* Active campaigns list will go here */}
        </Card>
      </div>
    </div>
  )
}
