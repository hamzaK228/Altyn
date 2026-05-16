import { z } from 'zod';

export const createWithdrawalSchema = z.object({
  goldWeightG: z.number().positive('Вес должен быть положительным').min(1, 'Минимум 1 грамм'),
  method: z.enum(['pickup', 'delivery']),
  address: z.string().optional(),
  branchId: z.string().optional(),
});

export const updateWithdrawalSchema = z.object({
  status: z.enum(['approved', 'ready', 'completed', 'cancelled']),
});

export type CreateWithdrawalDto = z.infer<typeof createWithdrawalSchema>;
export type UpdateWithdrawalDto = z.infer<typeof updateWithdrawalSchema>;
