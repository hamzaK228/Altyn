import { Router } from 'express';
import { AiController } from './ai.controller.js';
import { requireAuth } from '../../middleware/auth.js';

const router = Router();
const controller = new AiController();

router.post('/chat', requireAuth, controller.chat);
router.get('/forecast', requireAuth, controller.forecast);
router.get('/sentiment', requireAuth, controller.sentiment);
router.get('/insights', requireAuth, controller.insights);

export default router;
