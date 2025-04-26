import { axiosInstance } from "@/lib/utils";
import {
  WithdrawalFormData,
  BankAccountVerificationData,
} from "@/hooks/use-transactions";

class TransactionService {
  // Get all transactions for the logged-in user
  async getTransactions() {
    try {
      const response = await axiosInstance.get("/transactions");
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  }

  // Get wallet balance for the logged-in user
  async getWalletBalance() {
    try {
      const response = await axiosInstance.get("/transactions/wallet/balance");
      return response.data;
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      throw error;
    }
  }

  // Get transaction statistics for the logged-in user
  async getTransactionStats() {
    try {
      const response = await axiosInstance.get("/transactions/wallet/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching transaction stats:", error);
      throw error;
    }
  }

  // Get recent transactions for the logged-in user
  async getRecentTransactions(limit = 5) {
    try {
      const response = await axiosInstance.get(
        `/transactions/recent?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
      throw error;
    }
  }

  // Verify bank account using Paystack
  async verifyBankAccount(data: BankAccountVerificationData) {
    try {
      const response = await axiosInstance.post(
        "/transactions/verify-account",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error verifying bank account:", error);
      throw error;
    }
  }

  // Request a withdrawal
  async requestWithdrawal(data: WithdrawalFormData) {
    try {
      const response = await axiosInstance.post(
        "/transactions/withdrawal/request",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error requesting withdrawal:", error);
      throw error;
    }
  }

  // Get transaction details by ID
  async getTransactionById(id: string) {
    try {
      const response = await axiosInstance.get(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction ${id}:`, error);
      throw error;
    }
  }

  // Create a deposit (for advertisers funding their accounts)
  async createDeposit(amount: number, paymentMethod: string) {
    try {
      const response = await axiosInstance.post("/transactions/deposit", {
        amount,
        paymentMethod,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating deposit:", error);
      throw error;
    }
  }

  // Get advertiser wallet balance
  async getAdvertiserWalletBalance() {
    try {
      const response = await axiosInstance.get(
        "/advertiser/wallet/balance"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching advertiser wallet balance:", error);
      throw error;
    }
  }
}

const transactionService = new TransactionService();
export default transactionService;
