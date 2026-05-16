import { store, WithdrawalRecord } from '../../lib/store.js';

export class WithdrawalRepository {
  async create(data: Omit<WithdrawalRecord, 'id' | 'createdAt' | 'updatedAt' | 'referenceId'>): Promise<WithdrawalRecord> {
    const record: WithdrawalRecord = {
      ...data,
      id: store.genId(),
      referenceId: store.genRefId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.withdrawals.push(record);
    return record;
  }

  async findByUserId(userId: string): Promise<WithdrawalRecord[]> {
    return store.withdrawals
      .filter(w => w.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findById(id: string): Promise<WithdrawalRecord | undefined> {
    return store.withdrawals.find(w => w.id === id);
  }

  async updateStatus(id: string, status: WithdrawalRecord['status']): Promise<WithdrawalRecord | undefined> {
    const record = store.withdrawals.find(w => w.id === id);
    if (record) {
      record.status = status;
      record.updatedAt = new Date();
    }
    return record;
  }
}
