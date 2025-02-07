'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function WithdrawFunds() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Withdraw Funds</h1>
        <p className="mt-2 text-gray-600">Transfer your earnings to your bank account</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Withdrawal Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <Input type="number" placeholder="Enter amount" />
            </div>
            <Button className="w-full">Withdraw Funds</Button>
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
