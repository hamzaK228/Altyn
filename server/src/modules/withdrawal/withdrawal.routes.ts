import { Router } from 'express';
import { WithdrawalController } from './withdrawal.controller.js';
import { validate } from '../../lib/validate.js';
import { createWithdrawalSchema } from './withdrawal.schema.js';
import { requireAuth } from '../../middleware/auth.js';

const router = Router();
const controller = new WithdrawalController();

router.post('/', requireAuth, validate(createWithdrawalSchema), controller.create);
router.get('/', requireAuth, controller.getAll);
router.post('/:id/cancel', requireAuth, controller.cancel);

export default router;
