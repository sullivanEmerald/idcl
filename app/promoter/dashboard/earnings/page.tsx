'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowDown, Wallet } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import promoterService from '@/services/promoter'

interface Transaction {
  id: string
  campaignName: string
  brand: string
  amount: number
  status: 'completed' | 'pending' | 'processing'
  date: string
  type: 'campaign' | 'withdrawal' | 'bonus'
}

interface EarningsData {
  availableBalance: number
  pendingEarnings: number
  lifetimeEarnings: number
  transactions: Transaction[]
}

export default function EarningsPage() {
  const [earningsData, setEarningsData] = useState<EarningsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [transactionType, setTransactionType] = useState('all')

  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        // Replace with actual API call
        const response = await promoterService.getWalletOverview()
        setEarningsData(response.data)
      } catch (error) {
        console.error('Error fetching earnings data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEarningsData()
  }, [])

  const filteredTransactions = earningsData?.transactions.filter(transaction => 
    transactionType === 'all' || transaction.type === transactionType
  ) || []

  if (isLoading) {
    return (
      <div className="space-y-6 p-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    )
  }

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Earnings</h1>
          <p className="mt-2 text-gray-600">Track your earnings and withdraw funds</p>
        </div>
        <Button onClick={() => window.location.href = '/promoter/earnings/withdraw'}>
          <ArrowDown className="mr-2 h-4 w-4" />
          Withdraw Funds
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3">
              <Wallet className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Available Balance</h3>
              <p className="mt-2 text-3xl font-bold">
                ${earningsData?.availableBalance.toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Ready to withdraw
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-yellow-100 p-3">
              <Wallet className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Pending Earnings</h3>
              <p className="mt-2 text-3xl font-bold">
                ${earningsData?.pendingEarnings.toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Being processed
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Wallet className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Lifetime Earnings</h3>
              <p className="mt-2 text-3xl font-bold">
                ${earningsData?.lifetimeEarnings.toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Total earned to date
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h3 className="text-lg font-semibold">Transaction History</h3>
            <p className="mt-1 text-sm text-gray-600">Your recent earnings and withdrawals</p>
          </div>
          <Select value={transactionType} onValueChange={setTransactionType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="campaign">Campaign Earnings</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
              <SelectItem value="bonus">Bonuses</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="divide-y">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-6">
              <div>
                <p className="font-medium">
                  {transaction.type === 'campaign' ? transaction.campaignName :
                   transaction.type === 'withdrawal' ? 'Withdrawal' :
                   'Performance Bonus'}
                </p>
                {transaction.type === 'campaign' && (
                  <p className="text-sm text-gray-600">{transaction.brand}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()} · {new Date(transaction.date).toLocaleTimeString()}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-medium ${
                  transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount.toLocaleString()}
                </p>
                <p className={`text-sm ${
                  transaction.status === 'completed' ? 'text-green-600' :
                  transaction.status === 'pending' ? 'text-yellow-600' :
                  'text-blue-600'
                }`}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
