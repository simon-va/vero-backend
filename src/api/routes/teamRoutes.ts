import { Router } from 'express';
import TeamController from '../controllers/teamController';
import { auth, AuthType } from '../middlewares/auth';
import {
    ParamValue,
    validateBody,
    validateParams
} from '../middlewares/validate';

const router = Router();

const createTeamSchema = {
    name: {
        required: true,
        type: 'string'
    }
};

router.get(
    '/:clubId/teams',
    validateParams([ParamValue.ClubId]),
    auth([]),
    TeamController.getTeamsWithMembers
);

router.post(
    '/:clubId/teams',
    validateParams([ParamValue.ClubId]),
    validateBody(createTeamSchema),
    auth([AuthType.IsAdmin]),
    TeamController.createTeam
);

router.post(
    '/:clubId/teams/:teamId/members/:memberId',
    validateParams([ParamValue.ClubId, ParamValue.TeamId, ParamValue.MemberId]),
    auth([AuthType.IsAdmin]),
    TeamController.addMemberToTeam
);

router.delete(
    '/:clubId/teams/:teamId/members/:memberId',
    validateParams([ParamValue.ClubId, ParamValue.TeamId, ParamValue.MemberId]),
    auth([AuthType.IsAdmin]),
    TeamController.removeMemberFromTeam
);

router.delete(
    '/:clubId/teams/:teamId',
    validateParams([ParamValue.ClubId, ParamValue.TeamId]),
    auth([AuthType.IsAdmin]),
    TeamController.deleteTeam
);

export default router;
