import { NextFunction, Request, Response } from 'express';
import Club from '../../db/models/club';
import Member from '../../db/models/member';
import Team from '../../db/models/team';
import { CreationTeamAttributes } from '../../types/team';
import TeamService from '../services/teamService';

class TeamController {
    static async createTeam(req: Request, res: Response, next: NextFunction) {
        const clubId: Club['id'] = Number(req.params.clubId);
        const body: CreationTeamAttributes = req.body;

        try {
            const team = await TeamService.createTeam({
                clubId,
                teamPayload: {
                    ...body,
                    isSystemTeam: false
                }
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
        const teamId: Team['id'] = Number(req.params.teamId);
        const memberId: Member['id'] = Number(req.params.memberId);
        const clubId: Club['id'] = Number(req.params.clubId);

        try {
            await TeamService.addMemberToTeam({
                teamId,
                memberId,
                clubId
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
        const teamId: Team['id'] = Number(req.params.teamId);
        const memberId: Member['id'] = Number(req.params.memberId);
        const clubId: Club['id'] = Number(req.params.clubId);

        try {
            await TeamService.removeMemberFromTeam({
                teamId,
                memberId,
                clubId
            });

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    static async getTeamsWithMembers(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const clubId: Club['id'] = Number(req.params.clubId);

        try {
            const teams = await TeamService.getTeamsWithMembers(clubId);

            res.status(200).send(teams);
        } catch (error) {
            next(error);
        }
    }

    static async deleteTeam(req: Request, res: Response, next: NextFunction) {
        const teamId: Team['id'] = Number(req.params.teamId);
        const clubId: Club['id'] = Number(req.params.clubId);

        try {
            await TeamService.deleteTeam({
                teamId,
                clubId
            });

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default TeamController;
