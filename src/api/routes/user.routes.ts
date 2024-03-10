import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserMiddleware from '../middlewares/user.middleware';

const router = Router();

router.post('/register', UserMiddleware.registerCheck, UserController.registerUser);
router.post('/login', UserMiddleware.loginCheck, UserController.loginUser);

export default router;