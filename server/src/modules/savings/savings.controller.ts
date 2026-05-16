import { Request, Response, NextFunction } from 'express';
import { SavingsService } from './savings.service.js';
import { SavingsRepository } from './savings.repository.js';
import { PortfolioRepository } from '../portfolio/portfolio.repository.js';
import { GoldService } from '../gold/gold.service.js';
import { GoldRepository } from '../gold/gold.repository.js';

const savingsRepo = new SavingsRepository();
const portfolioRepo = new PortfolioRepository();
const goldRepo = new GoldRepository();
const goldService = new GoldService(goldRepo);
const savingsService = new SavingsService(savingsRepo, portfolioRepo, goldService);

export class SavingsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const goal = await savingsService.createGoal(userId, req.body);
      res.status(201).json({ success: true, data: goal });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const goals = await savingsService.getUserGoals(userId);
      res.json({ success: true, data: goals });
    } catch (error) {
      next(error);
    }
  }

  async contribute(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { id } = req.params;
      const { kgsAmount } = req.body;
      const result = await savingsService.contributeToGoal(userId, id, kgsAmount);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { id } = req.params;
      const result = await savingsService.cancelGoal(userId, id);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
