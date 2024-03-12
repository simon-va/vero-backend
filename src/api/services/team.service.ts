import Team, { TeamAttributes, TeamOutput } from '../../db/models/team.model';
import Member2Team, { Member2TeamOutput } from '../../db/models/member2team.model';

type AddTeamPayload = Pick<TeamAttributes, 'name' | 'clubId'>;

class TeamService {
    static async addTeam(payload: AddTeamPayload): Promise<TeamOutput> {
        return await Team.create(payload);
    }

    static async addMemberToTeam(teamId: number, memberId: number): Promise<Member2TeamOutput> {
        return await Member2Team.create({
            teamId,
            memberId
        });
    }

    static async deleteMemberFromTeam(teamId: number, memberId: number): Promise<void> {
        await Member2Team.destroy({
            where: {
                teamId,
                memberId
            }
        });
    }
}

export default TeamService;