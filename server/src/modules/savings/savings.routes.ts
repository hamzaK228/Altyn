import { Router } from 'express';
import { SavingsController } from './savings.controller.js';
import { validate } from '../../lib/validate.js';
import { createSavingsGoalSchema, contributeSavingsSchema } from './savings.schema.js';
import { requireAuth } from '../../middleware/auth.js';

const router = Router();
const controller = new SavingsController();

router.post('/', requireAuth, validate(createSavingsGoalSchema), controller.create);
router.get('/', requireAuth, controller.getAll);
router.post('/:id/contribute', requireAuth, validate(contributeSavingsSchema), controller.contribute);
router.post('/:id/cancel', requireAuth, controller.cancel);

export default router;
