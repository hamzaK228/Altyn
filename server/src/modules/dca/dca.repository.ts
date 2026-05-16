import { store, DcaPlanRecord } from '../../lib/store.js';

export class DcaRepository {
  async create(data: Omit<DcaPlanRecord, 'id' | 'createdAt' | 'updatedAt' | 'totalExecutions' | 'totalInvestedKGS' | 'totalGoldG' | 'isActive'>): Promise<DcaPlanRecord> {
    const record: DcaPlanRecord = {
      ...data,
      id: store.genId(),
      isActive: true,
      totalExecutions: 0,
      totalInvestedKGS: 0,
      totalGoldG: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.dcaPlans.push(record);
    return record;
  }

  async findByUserId(userId: string): Promise<DcaPlanRecord[]> {
    return store.dcaPlans
      .filter(d => d.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findById(id: string): Promise<DcaPlanRecord | undefined> {
    return store.dcaPlans.find(d => d.id === id);
  }

  async recordExecution(id: string, kgsAmount: number, goldG: number): Promise<DcaPlanRecord | undefined> {
    const plan = store.dcaPlans.find(d => d.id === id);
    if (plan) {
      plan.totalExecutions += 1;
      plan.totalInvestedKGS += kgsAmount;
      plan.totalGoldG += goldG;
      plan.updatedAt = new Date();

      // Calculate next execution date
      const now = new Date();
      if (plan.frequency === 'daily') {
        plan.nextExecutionDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      } else if (plan.frequency === 'weekly') {
        plan.nextExecutionDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      } else {
        plan.nextExecutionDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      }
    }
    return plan;
  }

  async setActive(id: string, isActive: boolean): Promise<DcaPlanRecord | undefined> {
    const plan = store.dcaPlans.find(d => d.id === id);
    if (plan) {
      plan.isActive = isActive;
      plan.updatedAt = new Date();
    }
    return plan;
  }
}
