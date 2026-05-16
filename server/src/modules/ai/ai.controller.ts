import { Request, Response, NextFunction } from 'express';
import { AiService } from './ai.service.js';
import { PortfolioRepository } from '../portfolio/portfolio.repository.js';

const portfolioRepo = new PortfolioRepository();
const aiService = new AiService(portfolioRepo);

export class AiController {
  async chat(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { message } = req.body;
      const result = await aiService.processChat(userId, message);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async forecast(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await aiService.getForecast();
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async sentiment(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await aiService.getSentiment();
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async insights(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const result = await aiService.getPortfolioInsights(userId);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
