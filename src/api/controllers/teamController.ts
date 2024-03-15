import { NextFunction, Request, Response } from 'express';
import { ClubAttributes } from '../../types/club';
import { CreationTeamAttributes } from '../../types/team';
import TeamService from '../services/teamService';

class TeamController {
    static async createTeam(req: Request, res: Response, next: NextFunction) {
        const clubId: ClubAttributes['id'] = Number(req.params.clubId);
        const body: CreationTeamAttributes = req.body;

        try {
            const team = await TeamService.createTeam({
                clubId,
                teamPayload: body
            });

            res.status(201).send(team);
        } catch (error) {
            next(error);
        }
    }

    static async addMemberToTeam(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const teamId = Number(req.params.teamId);
        const memberId = Number(req.params.memberId);

        try {
            await TeamService.addMemberToTeam({
                teamId,
                memberId
            });

            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }

    static async removeMemberFromTeam(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const teamId = Number(req.params.teamId);
        const memberId = Number(req.params.memberId);
        const clubId = Number(req.params.clubId);

        try {
            await TeamService.removeMemberFromTeam({
                teamId,
                memberId,
                clubId
            });

            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }
}

export default TeamController;
