import { GoldRepository } from './gold.repository.js';

export class GoldService {
  constructor(private goldRepo: GoldRepository) {}

  async getPrice() {
    let latest = await this.goldRepo.getLatest();
    if (!latest) {
      latest = await this.goldRepo.create(9216);
    }
    return {
      price: latest.price,
      currency: latest.currency,
      timestamp: latest.timestamp,
      changePercent: '+2.45',
      priceUSD: 2341,
    };
  }

  async getHistory() {
    return this.goldRepo.getHistory();
  }

  async getStats() {
    return {
      kumtorReserves: '560 т',
      stateGuarantee: '100%',
      activeInvestors: 12480,
      totalVolumeKGS: '24.8B',
      pricePerOunceUSD: 2341,
      inflationKGS: 8.4,
    };
  }
}
