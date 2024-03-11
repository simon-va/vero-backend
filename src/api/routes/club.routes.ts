import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import ClubController from '../controllers/club.controller';

const router = Router();

router.get('', AuthMiddleware.verifyToken, ClubController.getClubsByUserId);
router.post('', AuthMiddleware.verifyToken, ClubController.createClub);
router.delete('/:clubId', AuthMiddleware.verifyToken, AuthMiddleware.verifyIsAdmin, ClubController.deleteClub);

export default router;