import { z } from 'zod';

export const createSavingsGoalSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  targetGoldG: z.number().positive('Цель должна быть положительной'),
  deadline: z.string().datetime().optional(),
});

export const contributeSavingsSchema = z.object({
  kgsAmount: z.number().positive('Сумма должна быть положительной'),
});

export type CreateSavingsGoalDto = z.infer<typeof createSavingsGoalSchema>;
export type ContributeSavingsDto = z.infer<typeof contributeSavingsSchema>;
