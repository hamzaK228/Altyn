import { z } from 'zod';

export const createDcaSchema = z.object({
  amountKGS: z.number().positive('Сумма должна быть положительной').min(100, 'Минимум 100 сом'),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
});

export type CreateDcaDto = z.infer<typeof createDcaSchema>;
