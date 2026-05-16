import { store, SupportTicketRecord } from '../../lib/store.js';

export class SupportRepository {
  async create(data: { userId: string; subject: string; message: string; category: SupportTicketRecord['category'] }): Promise<SupportTicketRecord> {
    const record: SupportTicketRecord = {
      id: store.genId(),
      userId: data.userId,
      subject: data.subject,
      message: data.message,
      category: data.category,
      status: 'open',
      replies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.supportTickets.push(record);
    return record;
  }

  async findByUserId(userId: string): Promise<SupportTicketRecord[]> {
    return store.supportTickets
      .filter(t => t.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findById(id: string): Promise<SupportTicketRecord | undefined> {
    return store.supportTickets.find(t => t.id === id);
  }

  async addReply(id: string, message: string, isStaff: boolean): Promise<SupportTicketRecord | undefined> {
    const ticket = store.supportTickets.find(t => t.id === id);
    if (ticket) {
      ticket.replies.push({
        id: store.genId(),
        message,
        isStaff,
        createdAt: new Date(),
      });
      ticket.status = isStaff ? 'in_progress' : ticket.status;
      ticket.updatedAt = new Date();
    }
    return ticket;
  }

  async updateStatus(id: string, status: SupportTicketRecord['status']): Promise<SupportTicketRecord | undefined> {
    const ticket = store.supportTickets.find(t => t.id === id);
    if (ticket) {
      ticket.status = status;
      ticket.updatedAt = new Date();
    }
    return ticket;
  }
}
