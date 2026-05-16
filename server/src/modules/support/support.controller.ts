import { Request, Response, NextFunction } from 'express';
import { SupportService } from './support.service.js';
import { SupportRepository } from './support.repository.js';

const supportRepo = new SupportRepository();
const supportService = new SupportService(supportRepo);

export class SupportController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const result = await supportService.createTicket(userId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const tickets = await supportService.getUserTickets(userId);
      res.json({ success: true, data: tickets });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { id } = req.params;
      const ticket = await supportService.getTicket(userId, id);
      res.json({ success: true, data: ticket });
    } catch (error) {
      next(error);
    }
  }

  async reply(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { id } = req.params;
      const { message } = req.body;
      const result = await supportService.replyToTicket(userId, id, message);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
