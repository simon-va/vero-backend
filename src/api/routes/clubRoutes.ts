import { Router } from 'express';
import { auth, AuthType } from '../middlewares/auth';
import ClubController from '../controllers/clubController';
import { ParamValue, validateParams } from '../middlewares/validate';

const router = Router();

router.get('', auth([AuthType.NoMember, AuthType.User]), ClubController.getClubsByUserId);
router.post('', auth([AuthType.NoMember, AuthType.User]), ClubController.createClub);
router.delete('/:clubId', validateParams([ParamValue.ClubId]), auth([AuthType.IsAdmin]), ClubController.deleteClub);

export default router;