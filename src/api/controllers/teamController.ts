import { NextFunction, Request, Response } from 'express';
import { ClubAttributes } from '../../types/club';
import { CreationTeamAttributes } from '../../types/team';
import { MemberAttributes } from '../../types/member';
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
        const member: MemberAttributes = res.locals.member;

        try {
            await TeamService.addMemberToTeam({
                teamId,
                member
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
        const member: MemberAttributes = res.locals.member;

        try {
            await TeamService.removeMemberFromTeam({
                teamId,
                memberId: member.id
            });

            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }
}

export default TeamController;
