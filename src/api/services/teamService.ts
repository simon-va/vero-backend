import MemberRepository from '../../db/repositories/memberRepository';
import TeamRepository from '../../db/repositories/teamRepository';
import BaseError from '../../errors/BaseError';
import { ClubAttributes } from '../../types/club';
import { MemberAttributes } from '../../types/member';
import { CreationTeamAttributes, TeamAttributes } from '../../types/team';

interface CreateTeamPayload {
    clubId: ClubAttributes['id'];
    teamPayload: CreationTeamAttributes;
}

interface AddMemberToTeamPayload {
    teamId: TeamAttributes['id'];
    memberId: MemberAttributes['id'];
}

interface RemoveMemberFromTeamPayload {
    teamId: TeamAttributes['id'];
    memberId: MemberAttributes['id'];
    clubId: ClubAttributes['id'];
}

class TeamService {
    static async createTeam({ teamPayload, clubId }: CreateTeamPayload) {
        return await TeamRepository.createTeam({
            name: teamPayload.name,
            clubId: clubId
        });
    }

    static async addMemberToTeam({ memberId, teamId }: AddMemberToTeamPayload) {
        const member = await MemberRepository.getMemberById(memberId);
        const team = await TeamRepository.getTeamById(teamId);

        if (!member || !team) {
            throw new BaseError('Member or team not found', 400, true);
        }

        const isAlreadyInTeam = await member.hasTeam(team);

        if (isAlreadyInTeam) {
            throw new BaseError('Member is already in team', 400, true);
        }

        await TeamRepository.addMemberToTeam(member, team);
    }

    static async removeMemberFromTeam({
        memberId,
        teamId,
        clubId
    }: RemoveMemberFromTeamPayload) {
        // Todo check if member is in club

        await TeamRepository.removeMemberFromTeam(teamId, memberId);
    }
}

export default TeamService;
