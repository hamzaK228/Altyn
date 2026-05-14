import { Router } from 'express';
import { GoldController } from './gold.controller.js';

const router = Router();
const controller = new GoldController();

router.get('/price', controller.getPrice);
router.get('/history', controller.getHistory);
router.get('/stats', controller.getStats);

export default router;
