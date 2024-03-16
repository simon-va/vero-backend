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
        team: Team,
        member: Member
    ): Promise<void> {
        await member.removeTeam(team);
    }

    static async getTeamsWithMembers(clubId: number) {
        return await Team.findAll({
            where: { clubId },
            include: [
                {
                    model: Member,
                    as: 'members',
                    attributes: ['id']
                }
            ]
        });
    }
}

export default TeamRepository;
