'use client'

import { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { useTransactions } from '@/hooks/use-transactions'
import { format } from 'date-fns'
import Link from 'next/link'
import { ArrowRight, Download, DollarSign, ArrowUp, PiggyBank, Wallet } from 'lucide-react'

export default function WalletOverview() {
  const { 
    walletBalance, 
    isLoadingBalance, 
    fetchWalletBalance,
    fetchTransactionStats,
    transactions,
    isLoadingTransactions,
    fetchRecentTransactions
  } = useTransactions()

  useEffect(() => {
    fetchWalletBalance()
    fetchTransactionStats()
    fetchRecentTransactions(5)
  }, [fetchWalletBalance, fetchTransactionStats, fetchRecentTransactions])

  // Format currency values
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  // Format transaction type for display
  const formatTransactionType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Get transaction icon based on type
  const getTransactionIcon = (type: string) => {
    switch(type) {
      case 'deposit':
        return <Download className="h-4 w-4 text-green-500" />
      case 'withdrawal':
        return <ArrowUp className="h-4 w-4 text-red-500" />
      case 'earning':
        return <DollarSign className="h-4 w-4 text-blue-500" />
      case 'view_bonus':
      case 'click_bonus':
      case 'conversion_bonus':
      case 'awareness_bonus':
      case 'engagement_bonus':
        return <PiggyBank className="h-4 w-4 text-purple-500" />
      default:
        return <Wallet className="h-4 w-4 text-gray-500" />
    }
  }

  // Get transaction status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold">Wallet Overview</h1>
        <p className="mt-2 text-gray-600">Track your earnings and transactions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card className="p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 transform rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-2xl"></div>
          <h2 className="text-xl font-semibold mb-4">Available Balance</h2>
          
          {isLoadingBalance ? (
            <Skeleton className="h-12 w-1/2 mb-4" />
          ) : (
            <div className="mb-4">
              <p className="text-4xl font-bold text-indigo-600">{formatCurrency(walletBalance)}</p>
              <p className="text-sm text-gray-500">Available for withdrawal</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/promoter/dashboard/wallet/withdraw">
                <ArrowUp className="mr-2 h-4 w-4" /> Withdraw Funds
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/promoter/dashboard/wallet/transactions">
                View All Transactions <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>

        {/* <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Earnings Summary</h2>
          
          {isLoadingStats ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : stats ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <LineChart className="mr-2 h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Total Earnings</span>
                </div>
                <span className="font-semibold text-green-600">{formatCurrency(stats.totalEarnings)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <PiggyBank className="mr-2 h-5 w-5 text-purple-500" />
                  <span className="text-gray-700">Total Bonuses</span>
                </div>
                <span className="font-semibold text-purple-600">{formatCurrency(stats.totalBonuses)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ArrowUp className="mr-2 h-5 w-5 text-red-500" />
                  <span className="text-gray-700">Total Withdrawals</span>
                </div>
                <span className="font-semibold text-red-600">{formatCurrency(stats.totalWithdrawals)}</span>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              <p>No earnings data available</p>
            </div>
          )}
          
          <Button asChild variant="ghost" className="mt-4 w-full flex justify-center items-center">
            <Link href="/promoter/dashboard/earnings">
              <ExternalLink className="mr-2 h-4 w-4" /> View Detailed Earnings
            </Link>
          </Button>
        </Card> */}

        <Card className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <Button asChild variant="ghost" size="sm" className="text-indigo-600">
              <Link href="/promoter/dashboard/wallet/transactions">View All</Link>
            </Button>
          </div>
          
          {isLoadingTransactions ? (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 py-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          ) : transactions.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{formatTransactionType(transaction.type)}</p>
                      <p className="text-sm text-gray-500">{format(new Date(transaction.createdAt), 'MMM d, yyyy')}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className={transaction.type === 'withdrawal' ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                      {transaction.type === 'withdrawal' ? '-' : '+'}{formatCurrency(transaction.amount)}
                    </p>
                    <div className="mt-1">{getStatusBadge(transaction.status)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <p>No recent transactions</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}