'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Label } from '@/components/ui/label'
import { useTransactions } from '@/hooks/use-transactions'
import { Toaster, toast } from 'sonner'
import { AlertCircle, CheckCircle2, ArrowLeft, Wallet, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

interface Bank {
  id: number;
  name: string;
  code: string;
  active: boolean;
}

export default function WithdrawFunds() {
  const {
    walletBalance,
    isLoadingBalance,
    fetchWalletBalance,
    withdrawalFormData,
    isProcessingWithdrawal,
    withdrawalError,
    withdrawalSuccess,
    handleWithdrawalInputChange,
    submitWithdrawal,
    verifyBankAccount
  } = useTransactions()

  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    bankCode: '',
    accountName: '',
    isVerified: false,
    isVerifying: false
  })

  const [banks, setBanks] = useState<Bank[]>([])
  const [isLoadingBanks, setIsLoadingBanks] = useState(true)

  useEffect(() => {
    fetchWalletBalance()
    fetchBanks()
  }, [fetchWalletBalance])

  const fetchBanks = async () => {
    try {
      const response = await fetch('/api/banks')
      const data = await response.json()
      if (data.data) {
        // Filter for active Nigerian banks and sort by name
        const activeBanks = data.data
          .filter((bank: Bank) => bank.active)
          .sort((a: Bank, b: Bank) => a.name.localeCompare(b.name))
        setBanks(activeBanks)
      }
    } catch {
      console.error('Failed to fetch banks')
    } finally {
      setIsLoadingBanks(false)
    }
  }

  // Format currency values
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  }

  const handleAccountVerification = async () => {
    if (!bankDetails.accountNumber || !bankDetails.bankCode) return

    setBankDetails(prev => ({ ...prev, isVerifying: true }))
    try {
      const response = await verifyBankAccount({
        account_number: bankDetails.accountNumber,
        bank_code: bankDetails.bankCode
      })

      setBankDetails(prev => ({
        ...prev,
        accountName: response.account_name,
        isVerified: true,
        isVerifying: false
      }))
      handleWithdrawalInputChange('accountName', response.account_name);
      console.log(response);
    } catch {
      setBankDetails(prev => ({
        ...prev,
        accountName: '',
        isVerified: false,
        isVerifying: false
      }))
      toast.error('Failed to verify bank account')
    }
  }

  return (
    <div className="space-y-8 p-4 md:p-8">
      <Toaster richColors position="top-center" />
      <div className="flex items-center gap-2">
        <Link href="/promoter/dashboard/wallet/overview">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      <div>
        <h1 className="text-3xl font-bold">Withdraw Funds</h1>
        <p className="mt-2 text-gray-600">Transfer your earnings to your bank account</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-16 w-16 translate-x-1/3 -translate-y-1/3 transform rounded-full bg-blue-500/20 blur-xl"></div>
          <h2 className="text-xl font-semibold mb-6">Withdrawal Details</h2>
          
          <form onSubmit={(e) => submitWithdrawal(e)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-balance">Available Balance</Label>
              {isLoadingBalance ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <Wallet className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="font-medium">{formatCurrency(walletBalance)}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank-code">Bank Name</Label>
              {isLoadingBanks ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <select
                  id="bank-code"
                  value={bankDetails.bankCode}
                  onChange={(e) => {
                    setBankDetails(prev => ({ ...prev, bankCode: e.target.value, isVerified: false }));
                    handleWithdrawalInputChange('bankCode', e.target.value);
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  disabled={isProcessingWithdrawal}
                >
                  <option value="">Select your bank</option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <div className="flex gap-2">
                <Input
                  id="account-number"
                  type="text"
                  placeholder="Enter 10-digit account number"
                  value={bankDetails.accountNumber}
                  onChange={(e) => {
                    setBankDetails(prev => ({ ...prev, accountNumber: e.target.value, isVerified: false }));
                    handleWithdrawalInputChange('accountNumber', e.target.value);
                  }}
                  maxLength={10}
                  disabled={isProcessingWithdrawal}
                  className={withdrawalError && withdrawalError.includes('account') ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAccountVerification}
                  disabled={!bankDetails.accountNumber || !bankDetails.bankCode || bankDetails.isVerifying || isProcessingWithdrawal}
                >
                  {bankDetails.isVerifying ? 'Verifying...' : 'Verify'}
                </Button>
              </div>
            </div>

            {bankDetails.isVerified && (
              <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                <p className="text-sm text-green-700">Account Name: {bankDetails.accountName}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="amount">Withdrawal Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={withdrawalFormData.amount || ''}
                onChange={(e) => handleWithdrawalInputChange('amount', parseFloat(e.target.value))}
                min={10000}
                step={100}
                disabled={isProcessingWithdrawal || !bankDetails.isVerified}
                className={withdrawalError && withdrawalError.includes('amount') ? 'border-red-500' : ''}
              />
              {withdrawalError && withdrawalError.includes('amount') && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {withdrawalError}
                </p>
              )}
            </div>
            
            {withdrawalError && !withdrawalError.includes('amount') && !withdrawalError.includes('account') && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-md text-red-600 text-sm flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{withdrawalError}</p>
              </div>
            )}
            
            {withdrawalSuccess && (
              <div className="p-3 bg-green-50 border border-green-100 rounded-md text-green-600 text-sm flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>Your withdrawal request has been submitted successfully and is pending approval.</p>
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full"
              disabled={
                isProcessingWithdrawal || 
                isLoadingBalance || 
                walletBalance <= 0 || 
                Number(withdrawalFormData.amount) < 10000 || 
                !bankDetails.isVerified
              }
            >
              {isProcessingWithdrawal ? 'Processing...' : 'Withdraw Funds'}
            </Button>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-lg">Withdrawal Information</h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-600">
                  <li>Minimum withdrawal amount is ₦10,000</li>
                  <li>Withdrawals are processed within 1-2 business days</li>
                  <li>Make sure your account details are correct before proceeding</li>
                  <li>Bank transfer fees may apply</li>
                  <li>Only Nigerian bank accounts are supported</li>
                </ul>
              </div>
            </div>
        </Card>

        <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">How it works</h3>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">1</span>
                <p>Select your bank from the dropdown list</p>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">2</span>
                <p>Enter your account number and verify it</p>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">3</span>
                <p>Enter the amount you want to withdraw (minimum ₦10,000)</p>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">4</span>
                <p>Submit your withdrawal request</p>
              </li>
            </ol>
        </Card>
        </div>
      </div>
    </div>
  )
}
