import { Router } from 'express';
import ClubController from '../controllers/clubController';
import { auth, AuthType } from '../middlewares/auth';
import {
    ParamValue,
    validateBody,
    validateParams
} from '../middlewares/validate';

const router = Router();

const createClubBodySchema = {
    name: {
        required: true,
        type: 'string'
    }
};

router.get(
    '',
    auth([AuthType.NoMember, AuthType.User]),
    ClubController.getClubsByUserId
);

router.get(
    '/:clubId',
    validateParams([ParamValue.ClubId]),
    auth(),
    ClubController.getClubById
);

router.post(
    '',
    validateBody(createClubBodySchema),
    auth([AuthType.NoMember, AuthType.User]),
    ClubController.createClub
);

router.delete(
    '/:clubId',
    validateParams([ParamValue.ClubId]),
    auth([AuthType.IsAdmin]),
    ClubController.deleteClub
);

export default router;
