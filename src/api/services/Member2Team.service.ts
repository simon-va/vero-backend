import Member2Team, { Member2TeamOutput } from '../../db/models/member2team.model';

class Member2TeamService {
    static async addMemberToTeam(memberId: number, teamId: number): Promise<Member2TeamOutput> {
        return await Member2Team.create({ memberId, teamId });
    }
}

export default Member2TeamService;