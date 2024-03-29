import { Router } from 'express';
import { body } from 'express-validator';
import authController from '../controllers/AuthController.js';

const router = new Router();

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min:3, max: 32}),
  body('userName').notEmpty(),
  authController.registration);
router.post('/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);

export default router;