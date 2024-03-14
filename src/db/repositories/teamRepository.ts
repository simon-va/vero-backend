import { CreationTeamAttributes, TeamAttributes } from '../../types/team';
import Team from '../models/team';
import { MemberAttributes } from '../../types/member';
import Member2Team from '../models/member2team';

class TeamRepository {
    static async createTeam(payload: CreationTeamAttributes) {
        return await Team.create(payload);
    }

    static async addMemberToTeam(
        teamId: TeamAttributes['id'],
        memberId: MemberAttributes['id']
    ) {
        return await Member2Team.create({
            teamId,
            memberId
        });
    }

    static async removeMemberFromTeam(
        teamId: TeamAttributes['id'],
        memberId: MemberAttributes['id']
    ): Promise<void> {
        await Member2Team.destroy({
            where: {
                teamId,
                memberId
            }
        });
    }
}

export default TeamRepository;
