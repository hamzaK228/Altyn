import { SupportRepository } from './support.repository.js';
import { CreateTicketDto } from './support.schema.js';
import { ApiError } from '../../lib/errors.js';

export class SupportService {
  constructor(private supportRepo: SupportRepository) {}

  async createTicket(userId: string, data: CreateTicketDto) {
    const ticket = await this.supportRepo.create({
      userId,
      subject: data.subject,
      message: data.message,
      category: data.category,
    });

    return {
      ticket,
      message: 'Обращение создано. Мы ответим в ближайшее время.',
    };
  }

  async getUserTickets(userId: string) {
    return this.supportRepo.findByUserId(userId);
  }

  async getTicket(userId: string, ticketId: string) {
    const ticket = await this.supportRepo.findById(ticketId);
    if (!ticket) throw new ApiError(404, 'Обращение не найдено');
    if (ticket.userId !== userId) throw new ApiError(403, 'Нет доступа');
    return ticket;
  }

  async replyToTicket(userId: string, ticketId: string, message: string) {
    const ticket = await this.supportRepo.findById(ticketId);
    if (!ticket) throw new ApiError(404, 'Обращение не найдено');
    if (ticket.userId !== userId) throw new ApiError(403, 'Нет доступа');
    if (ticket.status === 'closed') throw new ApiError(400, 'Обращение закрыто');

    await this.supportRepo.addReply(ticketId, message, false);

    // Auto-reply from support
    setTimeout(async () => {
      await this.supportRepo.addReply(ticketId, 'Спасибо за ваше сообщение. Специалист ответит вам в ближайшее время.', true);
    }, 2000);

    return { message: 'Ответ отправлен' };
  }
}
