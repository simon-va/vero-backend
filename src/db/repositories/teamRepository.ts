import { Transaction } from 'sequelize';
import { CreationTeamAttributes, TeamAttributes } from '../../types/team';
import Member from '../models/member';
import Team from '../models/team';

class TeamRepository {
    static async createTeam(payload: CreationTeamAttributes, t?: Transaction) {
        return await Team.create(payload, { transaction: t });
    }

    static async getTeamById(teamId: TeamAttributes['id']) {
        return await Team.findByPk(teamId);
    }

    static async addMemberToTeam(member: Member, team: Team, t?: Transaction) {
        await member.addTeam(team, { transaction: t });
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

    static async deleteTeam(teamId: TeamAttributes['id']) {
        await Team.destroy({ where: { id: teamId } });
    }
}

export default TeamRepository;
