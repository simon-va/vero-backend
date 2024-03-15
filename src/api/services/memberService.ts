import Club from '../../db/models/club';
import ClubRepository from '../../db/repositories/clubRepository';
import MemberRepository from '../../db/repositories/memberRepository';
import BaseError from '../../errors/BaseError';
import { ClubAttributes } from '../../types/club';
import { CreationMemberAttributes, MemberAttributes } from '../../types/member';

type UpdateMemberPayload = Partial<MemberAttributes> & {
    id: MemberAttributes['id'];
};

interface DeleteMemberPayload {
    clubId: ClubAttributes['id'];
    memberIdToDelete: MemberAttributes['id'];
}

class MemberService {
    static async getMembersByClubId(clubId: ClubAttributes['id']) {
        return await MemberRepository.getMembersByClubId(clubId);
    }

    static async createMember(payload: CreationMemberAttributes) {
        return await MemberRepository.createMember(payload);
    }

    static async updateMember(
        payload: UpdateMemberPayload,
        clubId: Club['id']
    ) {
        const member = await MemberRepository.getMemberById(payload.id);

        if (!member || member.clubId !== clubId) {
            throw new BaseError('Member not part of club', 400, true);
        }

        await MemberRepository.updateMember(payload);
    }

    static async deleteMember({
        memberIdToDelete,
        clubId
    }: DeleteMemberPayload) {
        const members = await MemberRepository.getMembersByClubId(clubId);

        if (!members.some((member) => member.id === memberIdToDelete)) {
            throw new BaseError('Member is not in team', 404, true);
        }

        if (members.length === 1) {
            await ClubRepository.deleteClub(clubId);
        }

        await MemberRepository.deleteMember(memberIdToDelete);
    }
}

export default MemberService;
