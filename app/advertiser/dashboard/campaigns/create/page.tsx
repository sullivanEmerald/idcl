'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function CreateCampaign() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Create Campaign</h1>
        <p className="mt-2 text-gray-600">Launch a new advertising campaign</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Campaign Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
              <Input type="text" placeholder="Enter campaign name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <Textarea placeholder="Enter campaign description" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Budget</label>
              <Input type="number" placeholder="Enter campaign budget" />
            </div>
            <Button>Create Campaign</Button>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Campaign Settings</h2>
          {/* Additional campaign settings will go here */}
        </Card>
      </div>
    </div>
  )
}
