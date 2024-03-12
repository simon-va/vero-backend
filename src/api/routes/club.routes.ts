import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import ClubController from '../controllers/club.controller';

const router = Router();

router.get('', AuthMiddleware.verifyTokenWithUser, ClubController.getClubsByUserId);
router.post('', AuthMiddleware.verifyTokenWithUser, ClubController.createClub);
router.delete('/:clubId', AuthMiddleware.verifyTokenWithMember, ClubController.deleteClub);

export default router;