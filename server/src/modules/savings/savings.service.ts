import { SavingsRepository } from './savings.repository.js';
import { PortfolioRepository } from '../portfolio/portfolio.repository.js';
import { GoldService } from '../gold/gold.service.js';
import { CreateSavingsGoalDto } from './savings.schema.js';
import { ApiError } from '../../lib/errors.js';

export class SavingsService {
  constructor(
    private savingsRepo: SavingsRepository,
    private portfolioRepo: PortfolioRepository,
    private goldService: GoldService
  ) {}

  async createGoal(userId: string, data: CreateSavingsGoalDto) {
    const goal = await this.savingsRepo.create({
      userId,
      name: data.name,
      targetGoldG: data.targetGoldG,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
    });
    return goal;
  }

  async contributeToGoal(userId: string, goalId: string, kgsAmount: number) {
    const goal = await this.savingsRepo.findById(goalId);
    if (!goal) throw new ApiError(404, 'Цель не найдена');
    if (goal.userId !== userId) throw new ApiError(403, 'Нет доступа');
    if (goal.status !== 'active') throw new ApiError(400, 'Цель уже завершена или отменена');

    // Check balance
    const portfolio = await this.portfolioRepo.getByUserId(userId);
    if (portfolio.balanceKGS < kgsAmount) {
      throw new ApiError(400, 'Недостаточно средств на балансе');
    }

    // Convert KGS to gold
    const goldPrice = await this.goldService.getPrice();
    const goldG = Math.round((kgsAmount / goldPrice.price) * 1000) / 1000;

    // Deduct from balance, add gold to portfolio and goal
    await this.portfolioRepo.updateBalance(userId, -kgsAmount, goldG);
    await this.savingsRepo.addGold(goalId, goldG);

    // Create transaction record
    await this.portfolioRepo.createTransaction({
      userId,
      type: 'buy',
      kgsAmount,
      goldAmountG: goldG,
      pricePerGram: goldPrice.price,
    });

    const updated = await this.savingsRepo.findById(goalId);
    return {
      goal: updated,
      message: `Добавлено ${goldG} г золота к цели "${goal.name}"`,
    };
  }

  async getUserGoals(userId: string) {
    return this.savingsRepo.findByUserId(userId);
  }

  async cancelGoal(userId: string, goalId: string) {
    const goal = await this.savingsRepo.findById(goalId);
    if (!goal) throw new ApiError(404, 'Цель не найдена');
    if (goal.userId !== userId) throw new ApiError(403, 'Нет доступа');
    if (goal.status !== 'active') throw new ApiError(400, 'Цель уже завершена');

    await this.savingsRepo.updateStatus(goalId, 'cancelled');
    return { message: `Цель "${goal.name}" отменена` };
  }
}
