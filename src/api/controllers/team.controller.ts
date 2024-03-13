import { Request, Response } from 'express';
import { ClubAttributes } from '../../types/club';
import { CreationTeamAttributes } from '../../types/team';
import { MemberAttributes } from '../../types/member';
import TeamRepository from '../../db/repositories/team.repository';
import TeamHandler from '../handlers/team.handler';

class TeamController {
    static async createTeam(req: Request, res: Response) {
        try {
            const clubId: ClubAttributes['id'] = res.locals.clubId;
            const body: CreationTeamAttributes = req.body;

            const team = await TeamHandler.createTeam({
                clubId,
                teamPayload: body
            });

            res.status(201).send(team);
        } catch (error) {
            res.status(500).send({ errorMessage: 'Internal server error' });
        }
    }

    static async addMemberToTeam(req: Request, res: Response) {
        const teamId = Number(req.params.teamId);
        const member: MemberAttributes = res.locals.member;

        try {
            const response = await TeamHandler.addMemberToTeam({
                teamId,
                member
            });

            if (response && 'errorMessage' in response) {
                return res.status(400).send({ errorMessage: response.errorMessage });
            }

            return res.status(201).send();
        } catch (error) {
            console.log(error);

            res.status(500).send({ errorMessage: 'Internal server error' });
        }
    }

    static async removeMemberFromTeam(req: Request, res: Response) {
        const teamId = Number(req.params.teamId);
        const member: MemberAttributes = res.locals.member;

        try {
            const response = await TeamHandler.removeMemberFromTeam({
                teamId,
                memberId: member.id
            });

            if (response && 'errorMessage' in response) {
                return res.status(400).send({ errorMessage: response.errorMessage });
            }

            return res.status(200).send();
        } catch (error) {
            console.log(error);

            res.status(500).send({ errorMessage: 'Internal server error' });
        }
    }
}

export default TeamController;