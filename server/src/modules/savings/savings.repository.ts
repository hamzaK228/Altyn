import { store, SavingsGoalRecord } from '../../lib/store.js';

export class SavingsRepository {
  async create(data: Omit<SavingsGoalRecord, 'id' | 'createdAt' | 'updatedAt' | 'currentGoldG' | 'status'>): Promise<SavingsGoalRecord> {
    const record: SavingsGoalRecord = {
      ...data,
      id: store.genId(),
      currentGoldG: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.savingsGoals.push(record);
    return record;
  }

  async findByUserId(userId: string): Promise<SavingsGoalRecord[]> {
    return store.savingsGoals
      .filter(g => g.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findById(id: string): Promise<SavingsGoalRecord | undefined> {
    return store.savingsGoals.find(g => g.id === id);
  }

  async addGold(id: string, goldG: number): Promise<SavingsGoalRecord | undefined> {
    const goal = store.savingsGoals.find(g => g.id === id);
    if (goal) {
      goal.currentGoldG += goldG;
      goal.updatedAt = new Date();
      if (goal.currentGoldG >= goal.targetGoldG) {
        goal.status = 'completed';
      }
    }
    return goal;
  }

  async updateStatus(id: string, status: SavingsGoalRecord['status']): Promise<SavingsGoalRecord | undefined> {
    const goal = store.savingsGoals.find(g => g.id === id);
    if (goal) {
      goal.status = status;
      goal.updatedAt = new Date();
    }
    return goal;
  }
}
