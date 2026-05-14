import { PortfolioRepository } from './portfolio.repository.js';
import { GoldService } from '../gold/gold.service.js';
import { ApiError } from '../../lib/errors.js';

export class PortfolioService {
  constructor(
    private portfolioRepo: PortfolioRepository,
    private goldService: GoldService
  ) {}

  async getPortfolio(userId: string) {
    const portfolio = await this.portfolioRepo.getByUserId(userId);
    const goldPrice = await this.goldService.getPrice();

    return {
      balanceKGS: Math.round(portfolio.balanceKGS * 100) / 100,
      goldWeightG: Math.round(portfolio.goldWeightG * 1000) / 1000,
      goldValueKGS: Math.round(portfolio.goldWeightG * goldPrice.price * 100) / 100,
      totalValueKGS: Math.round((portfolio.balanceKGS + portfolio.goldWeightG * goldPrice.price) * 100) / 100,
      currentGoldPrice: goldPrice.price,
    };
  }

  async buyGold(userId: string, kgsAmount: number) {
    if (kgsAmount <= 0) throw new ApiError(400, 'Сумма должна быть положительной');

    const portfolio = await this.portfolioRepo.getByUserId(userId);
    if (portfolio.balanceKGS < kgsAmount) {
      throw new ApiError(400, 'Недостаточно средств на балансе');
    }

    const goldPrice = await this.goldService.getPrice();
    const goldAmountG = Math.round((kgsAmount / goldPrice.price) * 1000) / 1000;

    await this.portfolioRepo.updateBalance(userId, -kgsAmount, goldAmountG);

    const tx = await this.portfolioRepo.createTransaction({
      userId,
      type: 'buy',
      kgsAmount,
      goldAmountG,
      pricePerGram: goldPrice.price,
    });

    return { transaction: tx, message: `Куплено ${goldAmountG} г золота` };
  }

  async sellGold(userId: string, goldAmountG: number) {
    if (goldAmountG <= 0) throw new ApiError(400, 'Количество должно быть положительным');

    const portfolio = await this.portfolioRepo.getByUserId(userId);
    if (portfolio.goldWeightG < goldAmountG) {
      throw new ApiError(400, 'Недостаточно золота для продажи');
    }

    const goldPrice = await this.goldService.getPrice();
    const kgsAmount = Math.round(goldAmountG * goldPrice.price * 100) / 100;

    await this.portfolioRepo.updateBalance(userId, kgsAmount, -goldAmountG);

    const tx = await this.portfolioRepo.createTransaction({
      userId,
      type: 'sell',
      kgsAmount,
      goldAmountG,
      pricePerGram: goldPrice.price,
    });

    return { transaction: tx, message: `Продано ${goldAmountG} г золота за ${kgsAmount} сом` };
  }

  async getTransactions(userId: string) {
    return this.portfolioRepo.getTransactions(userId);
  }
}
