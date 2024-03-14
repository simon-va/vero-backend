import { ClubAttributes } from '../../types/club';
import { CreationTeamAttributes, TeamAttributes } from '../../types/team';
import TeamRepository from '../../db/repositories/teamRepository';
import { MemberAttributes } from '../../types/member';
import Member2teamRepository from '../../db/repositories/member2teamRepository';
import BaseError from '../../errors/BaseError';

interface CreateTeamPayload {
    clubId: ClubAttributes['id'];
    teamPayload: CreationTeamAttributes;
}

interface AddMemberToTeamPayload {
    teamId: TeamAttributes['id'];
    member: MemberAttributes;
}

interface RemoveMemberFromTeamPayload {
    teamId: TeamAttributes['id'];
    memberId: MemberAttributes['id'];
}

class TeamService {
    static async createTeam({ teamPayload, clubId }: CreateTeamPayload) {
        return await TeamRepository.createTeam({
            name: teamPayload.name,
            clubId: clubId
        });
    }

    static async addMemberToTeam({ member, teamId }: AddMemberToTeamPayload) {
        // check, if member is already in team
        const entry = await Member2teamRepository.getMemberInTeam({
            teamId,
            memberId: member.id
        });

        if (entry) {
            throw new BaseError('Member is already in team', 409, true);
        }

        await TeamRepository.addMemberToTeam(teamId, member.id);
    }

    static async removeMemberFromTeam({
        memberId,
        teamId
    }: RemoveMemberFromTeamPayload) {
        await TeamRepository.removeMemberFromTeam(teamId, memberId);
    }
}

export default TeamService;
