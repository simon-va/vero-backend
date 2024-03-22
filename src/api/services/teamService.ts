import MemberRepository from '../../db/repositories/memberRepository';
import TeamRepository from '../../db/repositories/teamRepository';
import Error400 from '../../errors/Error400';
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
    clubId: ClubAttributes['id'];
}

interface RemoveMemberFromTeamPayload {
    teamId: TeamAttributes['id'];
    memberId: MemberAttributes['id'];
    clubId: ClubAttributes['id'];
}

interface DeleteTeamPayload {
    teamId: TeamAttributes['id'];
    clubId: ClubAttributes['id'];
}

class TeamService {
    static async createTeam({ teamPayload, clubId }: CreateTeamPayload) {
        return await TeamRepository.createTeam({
            name: teamPayload.name,
            isSystemTeam: teamPayload.isSystemTeam,
            clubId: clubId
        });
    }

    static async addMemberToTeam({
        memberId,
        teamId,
        clubId
    }: AddMemberToTeamPayload) {
        const member = await MemberRepository.getMemberById(memberId);
        const team = await TeamRepository.getTeamById(teamId);

        if (
            !member ||
            !team ||
            member.clubId !== clubId ||
            team.clubId !== clubId
        ) {
            throw new Error400('Member or team are not part of club');
        }

        const isAlreadyInTeam = await member.hasTeam(team);

        if (isAlreadyInTeam) {
            throw new Error400('Member is already in team');
        }

        await TeamRepository.addMemberToTeam(member, team);
    }

    static async removeMemberFromTeam({
        memberId,
        teamId,
        clubId
    }: RemoveMemberFromTeamPayload) {
        const team = await TeamRepository.getTeamById(teamId);
        const member = await MemberRepository.getMemberById(memberId);

        if (
            !member ||
            !team ||
            member.clubId !== clubId ||
            team.clubId !== clubId
        ) {
            throw new Error400('Member or Team are not part of club');
        }

        await TeamRepository.removeMemberFromTeam(team, member);
    }

    static async getTeamsWithMembers(clubId: number) {
        const teams = await TeamRepository.getTeamsWithMembers(clubId);

        return teams.map((team) => ({
            id: team.id,
            name: team.name,
            isSystemTeam: team.isSystemTeam,
            memberIds: team.members?.map((member) => member.id)
        }));
    }

    static async deleteTeam({ teamId, clubId }: DeleteTeamPayload) {
        const team = await TeamRepository.getTeamById(teamId);

        if (!team || team.clubId !== clubId) {
            throw new Error400('Team not found');
        }

        if (team.isSystemTeam) {
            throw new Error400('Cannot delete system team');
        }

        return await TeamRepository.deleteTeam(teamId);
    }
}

export default TeamService;
