'use client'

import { Card } from '@/components/ui/card'

export default function WalletOverview() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Wallet Overview</h1>
        <p className="mt-2 text-gray-600">Manage your campaign budget</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Available Balance</h2>
          {/* Balance and quick actions will go here */}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold">Campaign Spending</h2>
          {/* Campaign budget allocation will go here */}
        </Card>

        <Card className="p-6 md:col-span-2">
          <h2 className="text-xl font-semibold">Transaction History</h2>
          {/* Transaction list will go here */}
        </Card>
      </div>
    </div>
  )
}
