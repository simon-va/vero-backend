import Club from '../../db/models/club';
import User from '../../db/models/user';
import ClubRepository from '../../db/repositories/clubRepository';
import MemberRepository from '../../db/repositories/memberRepository';
import UserRepository from '../../db/repositories/userRepository';
import Error400 from '../../errors/Error400';
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
            throw new Error400('Member not part of club');
        }

        await MemberRepository.updateMember(payload);
    }

    static async deleteMember({
        memberIdToDelete,
        clubId
    }: DeleteMemberPayload) {
        const members = await MemberRepository.getMembersByClubId(clubId);

        if (!members.some((member) => member.id === memberIdToDelete)) {
            throw new Error400('Member not part of club');
        }

        if (members.length === 1) {
            await ClubRepository.deleteClub(clubId);
        }

        await MemberRepository.deleteMember(memberIdToDelete);
    }

    static async assignUserToMember(
        memberId: MemberAttributes['id'],
        clubId: ClubAttributes['id'],
        email: User['email']
    ) {
        const user = await UserRepository.getUserByEmail(email);
        const member = await MemberRepository.getMemberById(memberId);

        if (!user) {
            throw new Error400('User not found');
        }

        if (!member || member.clubId !== clubId) {
            throw new Error400('Member not part of club');
        }

        await MemberRepository.updateMember({
            id: memberId,
            userId: user.id
        });

        return {
            userId: user.id
        };
    }
}

export default MemberService;
