'use client'

import { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertTriangle, Wallet } from 'lucide-react'
import { useTransactions } from '@/hooks/use-transactions'
import { Toaster } from 'sonner'

export default function WalletPage() {
  const {
    transactions,
    isLoadingTransactions,
    fetchRecentTransactions,
    advertiserWalletBalance,
    isLoadingAdvertiserBalance,
    fetchAdvertiserWalletBalance,
  } = useTransactions()

  useEffect(() => {
    fetchRecentTransactions(5)
    fetchAdvertiserWalletBalance()
  }, [fetchRecentTransactions, fetchAdvertiserWalletBalance])

  // Format currency values
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  }

  return (
    <div className="space-y-8 p-4 md:p-8">
      <Toaster richColors position="top-center" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Wallet</h1>
          <p className="mt-2 text-gray-600">Manage your campaign funds</p>
        </div>
        {/* <div className="flex gap-4">
          <Button variant="outline" asChild>
            <a href="/advertiser/dashboard/wallet/withdraw">
            <ArrowDown className="mr-2 h-4 w-4" />
            Withdraw
            </a>
          </Button>
          <Button asChild>
            <a href="/advertiser/dashboard/wallet/deposit">
            <Plus className="mr-2 h-4 w-4" />
            Add Funds
            </a>
          </Button>
        </div> */}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-16 w-16 translate-x-1/3 -translate-y-1/3 transform rounded-full bg-blue-500/20 blur-xl"></div>
          <h2 className="text-xl font-semibold mb-4">Total Balance</h2>
          {isLoadingAdvertiserBalance ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <div className="flex items-center p-3 bg-gray-50 rounded-md">
              <Wallet className="h-5 w-5 text-gray-500 mr-2" />
              <span className="font-medium text-2xl">{formatCurrency(advertiserWalletBalance.totalBudget)}</span>
            </div>
          )}
          <p className="mt-4 text-sm text-gray-600">Available for new campaigns {formatCurrency(advertiserWalletBalance.availableBudget)}</p>
        </Card>

        {/* <Card className="p-6">
          <div className="flex items-start">
            <PieChart className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-lg">Wallet Overview</h3>
              {isLoadingAdvertiserBalance ? (
                <Skeleton className="h-10 w-full mt-2" />
              ) : (
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Total Deposits:</span>
                    <span className="font-medium text-green-600">+{formatCurrency(advertiserWalletBalance.totalBudget)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Total Withdrawals:</span>
                    <span className="font-medium text-red-600">-{formatCurrency(advertiserWalletBalance.totalBudget)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Budget Allocated:</span>
                    <span className="font-medium text-amber-600">-{formatCurrency(advertiserWalletBalance.totalBudget)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card> */}

        {/* <Card className="p-6">
          <div className="flex items-start">
            <TrendingUp className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-lg">Campaign Spending</h3>
              {isLoadingTransactions ? (
                <Skeleton className="h-10 w-full mt-2" />
              ) : (
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Active Campaigns:</span>
                    <span className="font-medium">{transactions.filter(tx => tx.type === 'payment' && tx.status === 'completed').length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Last Campaign:</span>
                    <span className="font-medium">{
                      transactions.find(tx => tx.type === 'payment')?.createdAt 
                        ? new Date(transactions.find(tx => tx.type === 'payment')?.createdAt || '').toLocaleDateString()
                        : 'No campaigns yet'
                    }</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card> */}

        <Card className="p-6">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-lg">Wallet Information</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li>Funds can be used to create and boost campaigns</li>
                <li>Minimum deposit amount is ₦10,000</li>
                <li>Deposits are processed instantly</li>
                <li>Withdrawals are processed within 1-2 business days</li>
                <li>Bank transfer fees may apply</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b p-6">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <p className="mt-1 text-sm text-gray-600">Your recent wallet activity</p>
        </div>
        <div className="p-6">
          {isLoadingTransactions ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-center text-gray-600 py-8">No transactions found</p>
          ) : (
          <div className="divide-y">
              {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-4">
                <div>
                    <p className="font-medium">
                      {transaction.type === 'deposit' ? 'Wallet Deposit' :
                       transaction.type === 'withdrawal' ? 'Wallet Withdrawal' :
                       transaction.type === 'payment' ? 'Campaign Payment' :
                       'Transaction'}
                    </p>
                  <p className="text-sm text-gray-600">
                      {new Date(transaction.createdAt).toLocaleDateString()} · 
                      {new Date(transaction.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.type === 'deposit' ? 'text-green-600' :
                    transaction.type === 'withdrawal' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                  </p>
                    <p className={`text-sm capitalize ${
                    transaction.status === 'completed' ? 'text-green-600' :
                    transaction.status === 'pending' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                      {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </Card>
    </div>
  )
}
