import { ClubAttributes } from '../../types/club';
import MemberRepository from '../../db/repositories/memberRepository';
import { CreationMemberAttributes, MemberAttributes } from '../../types/member';
import ClubRepository from '../../db/repositories/clubRepository';
import BaseError from '../../errors/BaseError';

interface GetMembersByClubIdPayload {
    clubId: ClubAttributes['id'];
}

interface CreateMemberPayload {
    body: CreationMemberAttributes;
    clubId: ClubAttributes['id'];
}

type UpdateMemberPayload = Partial<MemberAttributes> & { id: MemberAttributes['id'] };

interface DeleteMemberPayload {
    clubId: ClubAttributes['id'];
    memberIdToDelete: MemberAttributes['id'];
}

class MemberService {
    static async getMembersByClubId({ clubId }: GetMembersByClubIdPayload) {
        return await MemberRepository.getMembersByClubId(clubId);
    }

    static async createMember({ clubId, body }: CreateMemberPayload) {
        const payload: CreationMemberAttributes = {
            firstName: body.firstName,
            lastName: body.lastName,
            isAdmin: body.isAdmin || false,
            clubId,
            email: body.email || ''
        };

        return await MemberRepository.createMember(payload);
    }

    static async updateMember(payload: UpdateMemberPayload) {
        await MemberRepository.updateMember(payload);
    }

    static async deleteMember({ memberIdToDelete, clubId }: DeleteMemberPayload) {
        const members = await MemberRepository.getMembersByClubId(clubId);

        if (!members.some(member => member.id === memberIdToDelete)) {
            throw new BaseError('Member does not exist', 404, true);
        }

        if (members.length === 1) {
            await ClubRepository.deleteClub(clubId);
        }

        await MemberRepository.deleteMember(memberIdToDelete);
    }
}

export default MemberService;