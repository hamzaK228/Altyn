import { store, PortfolioRecord, TransactionRecord } from '../../lib/store.js';

export class PortfolioRepository {
  async getByUserId(userId: string): Promise<PortfolioRecord> {
    let portfolio = store.portfolios.find(p => p.userId === userId);
    if (!portfolio) {
      portfolio = {
        userId,
        balanceKGS: 100000,
        goldWeightG: 0,
        updatedAt: new Date(),
      };
      store.portfolios.push(portfolio);
    }
    return portfolio;
  }

  async updateBalance(userId: string, kgsDelta: number, goldDelta: number): Promise<PortfolioRecord> {
    const portfolio = await this.getByUserId(userId);
    portfolio.balanceKGS += kgsDelta;
    portfolio.goldWeightG += goldDelta;
    portfolio.updatedAt = new Date();
    return portfolio;
  }

  async getTransactions(userId: string, limit: number = 20): Promise<TransactionRecord[]> {
    return store.transactions
      .filter(t => t.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async createTransaction(data: Omit<TransactionRecord, 'id' | 'timestamp'>): Promise<TransactionRecord> {
    const tx: TransactionRecord = {
      ...data,
      id: store.genId(),
      timestamp: new Date(),
    };
    store.transactions.push(tx);
    return tx;
  }
}
