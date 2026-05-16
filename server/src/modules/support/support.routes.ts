import { Router } from 'express';
import { SupportController } from './support.controller.js';
import { validate } from '../../lib/validate.js';
import { createTicketSchema, replyTicketSchema } from './support.schema.js';
import { requireAuth } from '../../middleware/auth.js';

const router = Router();
const controller = new SupportController();

router.post('/', requireAuth, validate(createTicketSchema), controller.create);
router.get('/', requireAuth, controller.getAll);
router.get('/:id', requireAuth, controller.getOne);
router.post('/:id/reply', requireAuth, validate(replyTicketSchema), controller.reply);

export default router;
