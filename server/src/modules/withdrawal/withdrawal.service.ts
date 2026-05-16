import { WithdrawalRepository } from './withdrawal.repository.js';
import { PortfolioRepository } from '../portfolio/portfolio.repository.js';
import { CreateWithdrawalDto } from './withdrawal.schema.js';
import { ApiError } from '../../lib/errors.js';

export class WithdrawalService {
  constructor(
    private withdrawalRepo: WithdrawalRepository,
    private portfolioRepo: PortfolioRepository
  ) {}

  async createWithdrawal(userId: string, data: CreateWithdrawalDto) {
    // Validate user has enough gold
    const portfolio = await this.portfolioRepo.getByUserId(userId);
    if (portfolio.goldWeightG < data.goldWeightG) {
      throw new ApiError(400, `Недостаточно золота. Доступно: ${portfolio.goldWeightG.toFixed(3)} г`);
    }

    if (data.method === 'delivery' && !data.address) {
      throw new ApiError(400, 'Укажите адрес для доставки');
    }

    // Deduct gold from portfolio
    await this.portfolioRepo.updateBalance(userId, 0, -data.goldWeightG);

    // Create withdrawal ticket
    const withdrawal = await this.withdrawalRepo.create({
      userId,
      goldWeightG: data.goldWeightG,
      method: data.method,
      status: 'pending',
      address: data.address,
      branchId: data.branchId,
      fee: 0, // State guarantee — no fee
    });

    return {
      withdrawal,
      message: `Заявка на ${data.goldWeightG} г золота создана. Номер: ${withdrawal.referenceId}`,
    };
  }

  async getUserWithdrawals(userId: string) {
    return this.withdrawalRepo.findByUserId(userId);
  }

  async cancelWithdrawal(userId: string, withdrawalId: string) {
    const withdrawal = await this.withdrawalRepo.findById(withdrawalId);
    if (!withdrawal) {
      throw new ApiError(404, 'Заявка не найдена');
    }
    if (withdrawal.userId !== userId) {
      throw new ApiError(403, 'Нет доступа к этой заявке');
    }
    if (withdrawal.status !== 'pending') {
      throw new ApiError(400, 'Можно отменить только заявки в статусе "Ожидание"');
    }

    // Refund gold back
    await this.portfolioRepo.updateBalance(userId, 0, withdrawal.goldWeightG);
    await this.withdrawalRepo.updateStatus(withdrawalId, 'cancelled');

    return { message: 'Заявка отменена. Золото возвращено на баланс.' };
  }
}
