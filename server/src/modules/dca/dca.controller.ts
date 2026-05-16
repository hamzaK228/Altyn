import { Request, Response, NextFunction } from 'express';
import { DcaService } from './dca.service.js';
import { DcaRepository } from './dca.repository.js';
import { PortfolioRepository } from '../portfolio/portfolio.repository.js';
import { GoldService } from '../gold/gold.service.js';
import { GoldRepository } from '../gold/gold.repository.js';

const dcaRepo = new DcaRepository();
const portfolioRepo = new PortfolioRepository();
const goldRepo = new GoldRepository();
const goldService = new GoldService(goldRepo);
const dcaService = new DcaService(dcaRepo, portfolioRepo, goldService);

export class DcaController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const plan = await dcaService.createPlan(userId, req.body);
      res.status(201).json({ success: true, data: plan });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const plans = await dcaService.getUserPlans(userId);
      res.json({ success: true, data: plans });
    } catch (error) {
      next(error);
    }
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { id } = req.params;
      const result = await dcaService.executePlan(userId, id);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async toggle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { id } = req.params;
      const result = await dcaService.togglePlan(userId, id);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
