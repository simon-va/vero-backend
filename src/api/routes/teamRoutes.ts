import { Router } from 'express';
import { auth, AuthType } from '../middlewares/auth';
import TeamController from '../controllers/teamController';
import { ParamValue, validateBody, validateParams } from '../middlewares/validate';

const router = Router();

const createTeamSchema = {
    name: {
        required: true,
        type: 'string'
    }
};

router.post('/:clubId/teams', validateParams([ParamValue.ClubId]), validateBody(createTeamSchema), auth([AuthType.IsAdmin]), TeamController.createTeam);
router.post('/:clubId/teams/:teamId/members/:memberId', validateParams([ParamValue.ClubId, ParamValue.TeamId, ParamValue.MemberId]), auth([AuthType.IsAdmin]), TeamController.addMemberToTeam);
router.delete('/:clubId/teams/:teamId/members/:memberId', validateParams([ParamValue.ClubId, ParamValue.TeamId, ParamValue.MemberId]), auth([AuthType.IsAdmin]), TeamController.removeMemberFromTeam);

export default router;