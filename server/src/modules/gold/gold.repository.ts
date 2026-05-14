import { store, GoldPriceRecord } from '../../lib/store.js';

export class GoldRepository {
  async getLatest(): Promise<GoldPriceRecord | undefined> {
    return store.goldPrices[store.goldPrices.length - 1];
  }

  async getHistory(limit: number = 30): Promise<GoldPriceRecord[]> {
    return store.goldPrices.slice(-limit);
  }

  async create(price: number): Promise<GoldPriceRecord> {
    const record: GoldPriceRecord = {
      id: store.genId(),
      price,
      currency: 'KGS',
      timestamp: new Date(),
    };
    store.goldPrices.push(record);
    return record;
  }
}
