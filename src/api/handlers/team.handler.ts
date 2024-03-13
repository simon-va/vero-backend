import { ClubAttributes } from '../../types/club';
import { CreationTeamAttributes, TeamAttributes } from '../../types/team';
import TeamRepository from '../../db/repositories/team.repository';
import { MemberAttributes } from '../../types/member';
import Member2Team from '../../db/models/member2team.model';
import Member2teamRepository from '../../db/repositories/member2team.repository';

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

class TeamHandler {
    static async createTeam({ teamPayload, clubId }: CreateTeamPayload) {
        return await TeamRepository.createTeam({
            name: teamPayload.name,
            clubId: clubId
        });
    }

    static async addMemberToTeam({ member, teamId }: AddMemberToTeamPayload) {
        if (!teamId) {
            return { errorMessage: 'Missing valid TeamId' };
        }

        // check, if member is already in team
        const entry = await Member2teamRepository.getMemberInTeam({
            teamId,
            memberId: member.id
        });

        if (entry) {
            return { errorMessage: 'Member is already in team' };
        }

        await TeamRepository.addMemberToTeam(teamId, member.id);
    }

    static async removeMemberFromTeam({ memberId, teamId }: RemoveMemberFromTeamPayload) {
        if (!teamId) {
            return { errorMessage: 'Missing valid TeamId' };
        }

        await TeamRepository.removeMemberFromTeam(teamId, memberId);
    }
}

export default TeamHandler;