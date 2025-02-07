'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function AdvertiserPromoters() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Promoters</h1>
        <p className="mt-2 text-gray-600">Manage and find promoters for your campaigns</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search promoters..."
          className="pl-10"
        />
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Active Promoters</h2>
          {/* Add promoter list here */}
        </Card>
      </div>
    </div>
  )
}
