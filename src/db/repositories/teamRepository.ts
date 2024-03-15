import Error400 from '../../errors/Error400';
import { MemberAttributes } from '../../types/member';
import { CreationTeamAttributes, TeamAttributes } from '../../types/team';
import Member from '../models/member';
import Team from '../models/team';

class TeamRepository {
    static async createTeam(payload: CreationTeamAttributes) {
        return await Team.create(payload);
    }

    static async getTeamById(teamId: TeamAttributes['id']) {
        return await Team.findByPk(teamId);
    }

    static async addMemberToTeam(member: Member, team: Team) {
        await member.addTeam(team);
    }

    static async removeMemberFromTeam(
        teamId: TeamAttributes['id'],
        memberId: MemberAttributes['id']
    ): Promise<void> {
        const member = await Member.findByPk(memberId);
        const team = await Team.findByPk(teamId);

        if (member && team) {
            await member.removeTeam(team);
        } else {
            throw new Error400('Member or team not found');
        }
    }

    static async getTeamsWithMembers(clubId: number) {
        return await Team.findAll({
            where: { clubId },
            include: [
                {
                    model: Member,
                    attributes: ['id'],
                    as: 'members'
                }
            ]
        });
    }
}

export default TeamRepository;
