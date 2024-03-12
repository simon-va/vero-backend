import {Router} from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import TeamController from '../controllers/team.controller';
import TeamMiddleware from '../middlewares/team.middleware';

const router = Router();

router.post('/:clubId/teams', AuthMiddleware.verifyTokenWithMember, TeamMiddleware.validateTeamCreation, TeamController.addTeam);
router.post('/:clubId/teams/:teamId/members/:memberId', AuthMiddleware.verifyTokenWithMember, TeamController.addMemberToTeam)

export default router;