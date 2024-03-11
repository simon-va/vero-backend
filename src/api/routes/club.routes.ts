import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import ClubController from '../controllers/club.controller';

const router = Router();

router.post('', AuthMiddleware.verifyToken, ClubController.createClub);

export default router;