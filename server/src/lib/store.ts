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

class InMemoryStore {
  users: UserRecord[] = [];
  goldPrices: GoldPriceRecord[] = [];
  portfolios: PortfolioRecord[] = [];
  transactions: TransactionRecord[] = [];

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
}

export const store = new InMemoryStore();
