import { Request, Response, NextFunction } from 'express';
import { WithdrawalService } from './withdrawal.service.js';
import { WithdrawalRepository } from './withdrawal.repository.js';
import { PortfolioRepository } from '../portfolio/portfolio.repository.js';

const withdrawalRepo = new WithdrawalRepository();
const portfolioRepo = new PortfolioRepository();
const withdrawalService = new WithdrawalService(withdrawalRepo, portfolioRepo);

export class WithdrawalController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const result = await withdrawalService.createWithdrawal(userId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const withdrawals = await withdrawalService.getUserWithdrawals(userId);
      res.json({ success: true, data: withdrawals });
    } catch (error) {
      next(error);
    }
  }

  async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { id } = req.params;
      const result = await withdrawalService.cancelWithdrawal(userId, id);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
