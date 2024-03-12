import { Request, Response } from 'express';
import TeamService from '../services/team.service';
import { ClubAttributes } from '../../db/models/club.model';
import Member, { MemberAttributes } from '../../db/models/member.model';
import Member2Team from '../../db/models/member2team.model';

class TeamController {
    static async addTeam(req: Request, res: Response) {
        try {
            const clubId: ClubAttributes['id'] = res.locals.clubId;
            const body = req.body;

            const team = await TeamService.addTeam({
                name: body.name,
                clubId: clubId
            });

            res.status(201).send(team);
        } catch (error) {
            res.status(500).send({ errorMessage: 'Internal server error' });
        }
    }

    static async addMemberToTeam(req: Request, res: Response) {
        const teamId = Number(req.params.teamId);
        const member: MemberAttributes = res.locals.member;

        if (!teamId) {
            return res.status(400).send({ errorMessage: 'Invalid teamId' });
        }

        try {
            // check, if member is already in team
            const entry = await Member2Team.findOne({
                where: {
                    teamId: teamId,
                    memberId: member.id
                }
            });

            if (entry) {
                return res.status(409).send({ errorMessage: 'Member is already in team' });
            }

            await TeamService.addMemberToTeam(teamId, member.id);

            return res.status(201).send();
        } catch (error) {
            console.log(error);

            res.status(500).send({ errorMessage: 'Internal server error' });
        }
    }

    static async deleteMemberFromTeam(req: Request, res: Response) {
        const teamId = Number(req.params.teamId);
        const member: Member = res.locals.member;

        if (!teamId) {
            return res.status(400).send({ errorMessage: 'Missing valid TeamId' });
        }

        try {
            await TeamService.deleteMemberFromTeam(teamId, member.id);

            return res.status(200).send();
        } catch (error) {
            console.log(error);

            res.status(500).send({ errorMessage: 'Internal server error' });
        }
    }
}

export default TeamController;