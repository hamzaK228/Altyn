// In-memory data store — replaces MongoDB for local development
import crypto from 'crypto';

export interface UserRecord {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface GoldPriceRecord {
  id: string;
  price: number;
  currency: string;
  timestamp: Date;
}

export interface PortfolioRecord {
  userId: string;
  balanceKGS: number;
  goldWeightG: number;
  updatedAt: Date;
}

export interface TransactionRecord {
  id: string;
  userId: string;
  type: 'buy' | 'sell';
  kgsAmount: number;
  goldAmountG: number;
  pricePerGram: number;
  timestamp: Date;
}

export interface WithdrawalRecord {
  id: string;
  userId: string;
  goldWeightG: number;
  method: 'pickup' | 'delivery';
  status: 'pending' | 'approved' | 'ready' | 'completed' | 'cancelled';
  address?: string;
  branchId?: string;
  fee: number;
  referenceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SavingsGoalRecord {
  id: string;
  userId: string;
  name: string;
  targetGoldG: number;
  currentGoldG: number;
  deadline?: Date;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface DcaPlanRecord {
  id: string;
  userId: string;
  amountKGS: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
  nextExecutionDate: Date;
  totalExecutions: number;
  totalInvestedKGS: number;
  totalGoldG: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SupportTicketRecord {
  id: string;
  userId: string;
  subject: string;
  message: string;
  category: 'general' | 'technical' | 'financial' | 'security';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  replies: Array<{
    id: string;
    message: string;
    isStaff: boolean;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

class InMemoryStore {
  users: UserRecord[] = [];
  goldPrices: GoldPriceRecord[] = [];
  portfolios: PortfolioRecord[] = [];
  transactions: TransactionRecord[] = [];
  withdrawals: WithdrawalRecord[] = [];
  savingsGoals: SavingsGoalRecord[] = [];
  dcaPlans: DcaPlanRecord[] = [];
  supportTickets: SupportTicketRecord[] = [];

  constructor() {
    this.seedGoldPrices();
  }

  private seedGoldPrices() {
    const basePrice = 9216;
    const now = Date.now();

    for (let i = 29; i >= 0; i--) {
      const variation = (Math.random() - 0.5) * 200;
      this.goldPrices.push({
        id: crypto.randomUUID(),
        price: Math.round((basePrice + variation) * 100) / 100,
        currency: 'KGS',
        timestamp: new Date(now - i * 24 * 60 * 60 * 1000),
      });
    }
  }

  genId(): string {
    return crypto.randomUUID();
  }

  genRefId(): string {
    return `ALT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  }
}

export const store = new InMemoryStore();
