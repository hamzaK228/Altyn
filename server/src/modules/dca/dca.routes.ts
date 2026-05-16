import { Router } from 'express';
import { DcaController } from './dca.controller.js';
import { validate } from '../../lib/validate.js';
import { createDcaSchema } from './dca.schema.js';
import { requireAuth } from '../../middleware/auth.js';

const router = Router();
const controller = new DcaController();

router.post('/', requireAuth, validate(createDcaSchema), controller.create);
router.get('/', requireAuth, controller.getAll);
router.post('/:id/execute', requireAuth, controller.execute);
router.post('/:id/toggle', requireAuth, controller.toggle);

export default router;
