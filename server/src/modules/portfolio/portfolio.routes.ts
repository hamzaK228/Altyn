import { Router } from 'express';
import { PortfolioController } from './portfolio.controller.js';
import { requireAuth } from '../../middleware/auth.js';

const router = Router();
const controller = new PortfolioController();

router.use(requireAuth);

router.get('/', controller.getPortfolio);
router.post('/buy', controller.buyGold);
router.post('/sell', controller.sellGold);
router.get('/transactions', controller.getTransactions);

export default router;
