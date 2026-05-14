import { Request, Response, NextFunction } from 'express';
import { PortfolioService } from './portfolio.service.js';
import { PortfolioRepository } from './portfolio.repository.js';
import { GoldService } from '../gold/gold.service.js';
import { GoldRepository } from '../gold/gold.repository.js';

const goldRepo = new GoldRepository();
const goldService = new GoldService(goldRepo);
const portfolioRepo = new PortfolioRepository();
const portfolioService = new PortfolioService(portfolioRepo, goldService);

export class PortfolioController {
  async getPortfolio(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const portfolio = await portfolioService.getPortfolio(userId);
      res.json({ success: true, data: portfolio });
    } catch (error) {
      next(error);
    }
  }

  async buyGold(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { kgsAmount } = req.body;
      const result = await portfolioService.buyGold(userId, kgsAmount);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async sellGold(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { goldAmountG } = req.body;
      const result = await portfolioService.sellGold(userId, goldAmountG);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const transactions = await portfolioService.getTransactions(userId);
      res.json({ success: true, data: transactions });
    } catch (error) {
      next(error);
    }
  }
}
