'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Plus, ArrowDown } from 'lucide-react'
import advertiserService from '@/services/advertiser'

import type { WalletTransaction } from '@/services/advertiser'

interface WalletData {
  balance: number
  pendingBalance: number
  transactions: {
    id: string
    type: string
    amount: number
    date: string
    description: string
    status: WalletTransaction['status']
    promoter: {
      firstName: string
      lastName: string
    }
    campaign: {
      title: string
    }
  }[]
}

export default function WalletPage() {
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // Replace with actual API call
        const walletOverview = await advertiserService.getWalletOverview()
        
        // Transform wallet data to match our component's needs
        const transformedData: WalletData = {
          balance: walletOverview.balance,
          pendingBalance: walletOverview.pendingBalance,
          transactions: walletOverview.recentTransactions.map(tx => ({
            id: tx.id,
            type: tx.type,
            amount: tx.amount,
            date: new Date(tx.date).toLocaleDateString(),
            description: `${tx.type} for campaign ${tx.campaign.title}`,
            status: tx.status,
            promoter: {
              firstName: tx.promoter.firstName,
              lastName: tx.promoter.lastName
            },
            campaign: {
              title: tx.campaign.title
            }
          }))
        }
        
        setWalletData(transformedData)
      } catch (error) {
        console.error('Error fetching wallet data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWalletData()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6 p-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
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
          <h1 className="text-3xl font-bold">Wallet</h1>
          <p className="mt-2 text-gray-600">Manage your campaign funds</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.location.href = '/advertiser/wallet/withdraw'}>
            <ArrowDown className="mr-2 h-4 w-4" />
            Withdraw
          </Button>
          <Button onClick={() => window.location.href = '/advertiser/wallet/deposit'}>
            <Plus className="mr-2 h-4 w-4" />
            Add Funds
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Available Balance</h3>
          <p className="mt-2 text-4xl font-bold">
            ${walletData?.balance.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Available for campaign spending
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold">Pending Balance</h3>
          <p className="mt-2 text-4xl font-bold">
            ${walletData?.pendingBalance.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Funds being processed or held
          </p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b p-6">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <p className="mt-1 text-sm text-gray-600">Your recent wallet activity</p>
        </div>
        <div className="p-6">
          <div className="divide-y">
            {walletData?.transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()} · {new Date(transaction.date).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.type === 'deposit' ? 'text-green-600' :
                    transaction.type === 'withdrawal' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </p>
                  <p className={`text-sm ${
                    transaction.status === 'completed' ? 'text-green-600' :
                    transaction.status === 'pending' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
