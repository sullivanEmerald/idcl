'use client'

import { Card } from '@/components/ui/card'

export default function CampaignsOverview() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Campaign Overview</h1>
        <p className="mt-2 text-gray-600">Monitor your campaign performance</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Active Campaigns</h2>
          {/* Active campaigns list will go here */}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Campaign Performance</h2>
          {/* Performance metrics will go here */}
        </Card>
      </div>
    </div>
  )
}
