/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import transactionService from "@/services/transaction";
import { advertiserService, DashboardMetrics } from "@/services/advertiser";
import { toast } from "sonner";

export type Transaction = {
  id: string;
  userId: string;
  promoterId?: string;
  campaignId?: string;
  type:
    | "deposit"
    | "withdrawal"
    | "earning"
    | "payment"
    | "view_bonus"
    | "click_bonus"
    | "conversion_bonus"
    | "awareness_bonus"
    | "engagement_bonus";
  amount: number;
  status: "pending" | "completed" | "failed";
  paymentMethod?: string;
  paymentId?: string;
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
};

export type TransactionStats = {
  totalDeposits: number;
  totalWithdrawals: number;
  totalEarnings: number;
  totalPayments: number;
  totalBonuses: number;
};

export type WithdrawalFormData = {
  amount: number;
  bankCode: string;
  accountNumber: string;
  accountName: string;
};

export type BankAccountVerificationData = {
  account_number: string;
  bank_code: string;
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] =
    useState<boolean>(false);
  const [transactionError, setTransactionError] = useState<string | null>(null);

  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);

  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState<boolean>(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [advertiserWalletBalance, setAdvertiserWalletBalance] = useState<
    Omit<
      DashboardMetrics,
      | "activeCampaigns"
      | "totalCampaigns"
      | "pausedCampaigns"
      | "activePromoters"
      | "totalReach"
    >
  >({
    totalBudget: 0,
    availableBudget: 0,
  });
  const [isLoadingAdvertiserBalance, setIsLoadingAdvertiserBalance] =
    useState<boolean>(false);
  const [advertiserBalanceError, setAdvertiserBalanceError] = useState<
    string | null
  >(null);

  const [withdrawalFormData, setWithdrawalFormData] =
    useState<WithdrawalFormData>({
      amount: 0,
      bankCode: "",
      accountNumber: "",
      accountName: "",
    });
  const [isProcessingWithdrawal, setIsProcessingWithdrawal] =
    useState<boolean>(false);
  const [withdrawalError, setWithdrawalError] = useState<string | null>(null);
  const [withdrawalSuccess, setWithdrawalSuccess] = useState<boolean>(false);

  // Fetch all transactions
  const fetchTransactions = useCallback(async () => {
    setIsLoadingTransactions(true);
    setTransactionError(null);

    try {
      const data = await transactionService.getTransactions();
      setTransactions(data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to load transactions";
      setTransactionError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoadingTransactions(false);
    }
  }, []);

  // Fetch wallet balance
  const fetchWalletBalance = useCallback(async () => {
    setIsLoadingBalance(true);
    setBalanceError(null);

    try {
      const balance = await transactionService.getWalletBalance();
      setWalletBalance(balance);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to load wallet balance";
      setBalanceError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoadingBalance(false);
    }
  }, []);

  // Fetch advertiser wallet balance
  const fetchAdvertiserWalletBalance = useCallback(async () => {
    setIsLoadingAdvertiserBalance(true);
    setAdvertiserBalanceError(null);

    try {
      const data = await advertiserService.getDashboard();
      setAdvertiserWalletBalance(data.metrics);
      console.log(data.metrics);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to load advertiser wallet balance";
      setAdvertiserBalanceError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoadingAdvertiserBalance(false);
    }
  }, []);

  // Fetch transaction stats
  const fetchTransactionStats = useCallback(async () => {
    setIsLoadingStats(true);
    setStatsError(null);

    try {
      const statsData = await transactionService.getTransactionStats();
      setStats(statsData);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to load transaction statistics";
      setStatsError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoadingStats(false);
    }
  }, []);

  // Verify bank account
  const verifyBankAccount = useCallback(
    async (data: BankAccountVerificationData) => {
      try {
        const response = await transactionService.verifyBankAccount(data);
        return response;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to verify bank account";
        toast.error(errorMessage);
        throw error;
      }
    },
    []
  );

  // Handle withdrawal form input changes
  const handleWithdrawalInputChange = useCallback(
    (name: string, value: string | number) => {
      setWithdrawalFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setWithdrawalError(null);
    },
    []
  );

  // Submit withdrawal request
  const submitWithdrawal = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      // Form validation
      if (withdrawalFormData.amount < 10000) {
        setWithdrawalError("Minimum withdrawal amount is ₦10,000");
        return;
      }

      if (
        !withdrawalFormData.bankCode ||
        !withdrawalFormData.accountNumber ||
        !withdrawalFormData.accountName
      ) {
        setWithdrawalError("Bank account details are required");
        return;
      }

      setIsProcessingWithdrawal(true);
      setWithdrawalError(null);
      setWithdrawalSuccess(false);

      try {
        await transactionService.requestWithdrawal(withdrawalFormData);

        toast.success("Withdrawal request submitted successfully");
        setWithdrawalSuccess(true);

        // Reset form
        setWithdrawalFormData({
          amount: 0,
          bankCode: "",
          accountNumber: "",
          accountName: "",
        });

        // Refresh balance and transactions
        fetchWalletBalance();
        fetchTransactions();
        fetchAdvertiserWalletBalance();
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to process withdrawal request";
        setWithdrawalError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsProcessingWithdrawal(false);
      }
    },
    [
      withdrawalFormData,
      fetchWalletBalance,
      fetchTransactions,
      fetchAdvertiserWalletBalance,
    ]
  );

  // Fetch recent transactions
  const fetchRecentTransactions = useCallback(async (limit = 5) => {
    setIsLoadingTransactions(true);
    setTransactionError(null);

    try {
      const data = await transactionService.getRecentTransactions(limit);
      setTransactions(data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to load recent transactions";
      setTransactionError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoadingTransactions(false);
    }
  }, []);

  return {
    // Transactions
    transactions,
    isLoadingTransactions,
    transactionError,
    fetchTransactions,
    fetchRecentTransactions,

    // Wallet balance
    walletBalance,
    isLoadingBalance,
    balanceError,
    fetchWalletBalance,

    // Transaction stats
    stats,
    isLoadingStats,
    statsError,
    fetchTransactionStats,

    // Withdrawal
    withdrawalFormData,
    isProcessingWithdrawal,
    withdrawalError,
    withdrawalSuccess,
    handleWithdrawalInputChange,
    submitWithdrawal,
    verifyBankAccount,

    // Advertiser Wallet
    advertiserWalletBalance,
    isLoadingAdvertiserBalance,
    advertiserBalanceError,
    fetchAdvertiserWalletBalance,
  };
};
