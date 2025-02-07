'use client'

import { Card } from '@/components/ui/card'

export default function CompletedCampaigns() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Completed Campaigns</h1>
        <p className="mt-2 text-gray-600">View your campaign history</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          {/* Completed campaigns list will go here */}
        </Card>
      </div>
    </div>
  )
}
