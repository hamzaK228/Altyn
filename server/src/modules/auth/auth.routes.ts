import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validate } from '../../lib/validate.js';
import { registerSchema, loginSchema } from './auth.schema.js';
import { requireAuth } from '../../middleware/auth.js';

const router = Router();
const controller = new AuthController();

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.get('/me', requireAuth, controller.getMe);

export default router;
