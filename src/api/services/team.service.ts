import Team from '../../db/models/team.model';
import Member2Team from '../../db/models/member2team.model';
import { CreationTeamAttributes, TeamAttributes } from '../../types/team';
import { MemberAttributes } from '../../types/member';

class TeamService {
    static async addTeam(payload: CreationTeamAttributes) {
        return await Team.create(payload);
    }

    static async addMemberToTeam(teamId: TeamAttributes['id'], memberId: MemberAttributes['id']) {
        return await Member2Team.create({
            teamId,
            memberId
        });
    }

    static async deleteMemberFromTeam(teamId: TeamAttributes['id'], memberId: MemberAttributes['id']): Promise<void> {
        await Member2Team.destroy({
            where: {
                teamId,
                memberId
            }
        });
    }
}

export default TeamService;