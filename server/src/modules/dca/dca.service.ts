import { DcaRepository } from './dca.repository.js';
import { PortfolioRepository } from '../portfolio/portfolio.repository.js';
import { GoldService } from '../gold/gold.service.js';
import { CreateDcaDto } from './dca.schema.js';
import { ApiError } from '../../lib/errors.js';

export class DcaService {
  constructor(
    private dcaRepo: DcaRepository,
    private portfolioRepo: PortfolioRepository,
    private goldService: GoldService
  ) {}

  async createPlan(userId: string, data: CreateDcaDto) {
    const now = new Date();
    let nextExecution: Date;

    if (data.frequency === 'daily') {
      nextExecution = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    } else if (data.frequency === 'weekly') {
      nextExecution = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    } else {
      nextExecution = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    }

    const plan = await this.dcaRepo.create({
      userId,
      amountKGS: data.amountKGS,
      frequency: data.frequency,
      nextExecutionDate: nextExecution,
    });

    return plan;
  }

  async executePlan(userId: string, planId: string) {
    const plan = await this.dcaRepo.findById(planId);
    if (!plan) throw new ApiError(404, 'План не найден');
    if (plan.userId !== userId) throw new ApiError(403, 'Нет доступа');
    if (!plan.isActive) throw new ApiError(400, 'План неактивен');

    const portfolio = await this.portfolioRepo.getByUserId(userId);
    if (portfolio.balanceKGS < plan.amountKGS) {
      throw new ApiError(400, 'Недостаточно средств для автопокупки');
    }

    const goldPrice = await this.goldService.getPrice();
    const goldG = Math.round((plan.amountKGS / goldPrice.price) * 1000) / 1000;

    await this.portfolioRepo.updateBalance(userId, -plan.amountKGS, goldG);
    await this.dcaRepo.recordExecution(planId, plan.amountKGS, goldG);

    await this.portfolioRepo.createTransaction({
      userId,
      type: 'buy',
      kgsAmount: plan.amountKGS,
      goldAmountG: goldG,
      pricePerGram: goldPrice.price,
    });

    return {
      message: `Автопокупка выполнена: ${goldG} г за ${plan.amountKGS} сом`,
      goldPurchased: goldG,
      kgsSpent: plan.amountKGS,
    };
  }

  async getUserPlans(userId: string) {
    return this.dcaRepo.findByUserId(userId);
  }

  async togglePlan(userId: string, planId: string) {
    const plan = await this.dcaRepo.findById(planId);
    if (!plan) throw new ApiError(404, 'План не найден');
    if (plan.userId !== userId) throw new ApiError(403, 'Нет доступа');

    await this.dcaRepo.setActive(planId, !plan.isActive);
    return {
      message: plan.isActive ? 'План приостановлен' : 'План активирован',
      isActive: !plan.isActive,
    };
  }
}
