'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useTransactions, Transaction } from '@/hooks/use-transactions'
import { format } from 'date-fns'
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowDownCircle, 
  ArrowUpCircle,
  DollarSign,
  Wallet,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TransactionHistory() {
  const { transactions, isLoadingTransactions, fetchTransactions } = useTransactions()
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const itemsPerPage = 10
  
  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])
  
  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter(transaction => {
      if (filter === 'all') return true
      if (filter === 'deposits' && transaction.type === 'deposit') return true
      if (filter === 'withdrawals' && transaction.type === 'withdrawal') return true
      if (filter === 'earnings' && transaction.type === 'earning') return true
      if (filter === 'bonuses' && ['view_bonus', 'click_bonus', 'conversion_bonus', 'awareness_bonus', 'engagement_bonus'].includes(transaction.type)) return true
      return false
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (sortBy === 'highest') return b.amount - a.amount
      if (sortBy === 'lowest') return a.amount - b.amount
      return 0
    })
  
  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  // Get transaction icon based on type
  const getTransactionIcon = (type: string) => {
    switch(type) {
      case 'deposit':
        return <ArrowDownCircle className="h-5 w-5 text-green-500" />
      case 'withdrawal':
        return <ArrowUpCircle className="h-5 w-5 text-red-500" />
      case 'earning':
        return <DollarSign className="h-5 w-5 text-blue-500" />
      case 'view_bonus':
      case 'click_bonus':
      case 'conversion_bonus':
      case 'awareness_bonus':
      case 'engagement_bonus':
        return <Wallet className="h-5 w-5 text-purple-500" />
      default:
        return <DollarSign className="h-5 w-5 text-gray-500" />
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
  
  // Format transaction amount with sign
  const formatAmount = (transaction: Transaction) => {
    if (['deposit', 'earning', 'view_bonus', 'click_bonus', 'conversion_bonus', 'awareness_bonus', 'engagement_bonus'].includes(transaction.type)) {
      return <span className="font-semibold text-green-600">+₦{transaction.amount.toFixed(2)}</span>
    } else {
      return <span className="font-semibold text-red-600">-₦{transaction.amount.toFixed(2)}</span>
    }
  }
  
  // Format transaction type for display
  const formatTransactionType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <p className="mt-2 text-gray-600">View all your past transactions</p>
      </div>

      <Card className="p-4 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold">All Transactions</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="deposits">Deposits</SelectItem>
                <SelectItem value="withdrawals">Withdrawals</SelectItem>
                <SelectItem value="earnings">Earnings</SelectItem>
                <SelectItem value="bonuses">Bonuses</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Amount</SelectItem>
                <SelectItem value="lowest">Lowest Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoadingTransactions ? (
          // Loading skeleton
          <div className="space-y-4">
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="flex items-center space-x-4 py-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
        ) : paginatedTransactions.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-900">
                        <div className="flex items-center space-x-3">
                          {getTransactionIcon(transaction.type)}
                          <span>{formatTransactionType(transaction.type)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {format(new Date(transaction.createdAt), 'MMM d, yyyy h:mm a')}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        {formatAmount(transaction)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {getStatusBadge(transaction.status)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {transaction.paymentMethod || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(page * itemsPerPage, filteredTransactions.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredTransactions.length}</span> results
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    // Logic to show pages around current page
                    let pageNum = i + 1;
                    if (totalPages > 5) {
                      if (page > 3) {
                        pageNum = page - 3 + i;
                      }
                      if (page > totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      }
                    }
                    if (pageNum <= totalPages) {
                      return (
                        <Button
                          key={i}
                          variant={page === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                    return null;
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-500">No transactions found</p>
          </div>
        )}
      </Card>
    </div>
  )
} 