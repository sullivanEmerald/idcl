'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AddFunds() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Add Funds</h1>
        <p className="mt-2 text-gray-600">Add money to your campaign wallet</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <Input type="number" placeholder="Enter amount" />
            </div>
            <Button className="w-full">Add Funds</Button>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
          {/* Payment methods list will go here */}
        </Card>
      </div>
    </div>
  )
}
