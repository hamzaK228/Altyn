import { z } from 'zod';

export const createTicketSchema = z.object({
  subject: z.string().min(3, 'Тема слишком короткая'),
  message: z.string().min(10, 'Сообщение слишком короткое'),
  category: z.enum(['general', 'technical', 'financial', 'security']),
});

export const replyTicketSchema = z.object({
  message: z.string().min(1, 'Сообщение обязательно'),
});

export type CreateTicketDto = z.infer<typeof createTicketSchema>;
export type ReplyTicketDto = z.infer<typeof replyTicketSchema>;
