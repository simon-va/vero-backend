import { TeamAttributes } from '../../types/team';
import { MemberAttributes } from '../../types/member';
import Member2Team from '../models/member2team';

interface GetMemberInTeamPayload {
    teamId: TeamAttributes['id'];
    memberId: MemberAttributes['id'];
}

class Member2teamRepository {
    static async getMemberInTeam({ teamId, memberId }: GetMemberInTeamPayload) {
        return await Member2Team.findOne({
            where: {
                teamId,
                memberId
            }
        });
    }
}

export default Member2teamRepository;
