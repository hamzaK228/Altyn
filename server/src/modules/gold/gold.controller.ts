import { Request, Response, NextFunction } from 'express';
import { GoldService } from './gold.service.js';
import { GoldRepository } from './gold.repository.js';

const goldRepo = new GoldRepository();
const goldService = new GoldService(goldRepo);

export class GoldController {
  async getPrice(req: Request, res: Response, next: NextFunction) {
    try {
      const price = await goldService.getPrice();
      res.json({ success: true, data: price });
    } catch (error) {
      next(error);
    }
  }

  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const history = await goldService.getHistory();
      res.json({ success: true, data: history });
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await goldService.getStats();
      res.json({ success: true, data: stats });
    } catch (error) {
      next(error);
    }
  }
}
