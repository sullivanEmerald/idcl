'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function BrowseCampaigns() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Browse Campaigns</h1>
        <p className="mt-2 text-gray-600">Find campaigns that match your interests</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search campaigns..."
          className="pl-10"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Campaign cards will go here */}
      </div>
    </div>
  )
}
