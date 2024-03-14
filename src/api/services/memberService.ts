import { ClubAttributes } from '../../types/club';
import MemberRepository from '../../db/repositories/memberRepository';
import { CreationMemberAttributes, MemberAttributes } from '../../types/member';
import ClubRepository from '../../db/repositories/clubRepository';

interface GetMembersByClubIdPayload {
    clubId: ClubAttributes['id'];
}

interface CreateMemberPayload {
    body: CreationMemberAttributes;
    clubId: ClubAttributes['id'];
}

interface UpdateMemberPayload {
    body: CreationMemberAttributes;
    member: MemberAttributes;
}

interface DeleteMemberPayload {
    clubId: ClubAttributes['id'];
    member: MemberAttributes;
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

    static async updateMember({ body, member }: UpdateMemberPayload) {
        if (!member.isAdmin) {
            return { errorMessage: 'Unauthorized' };
        }

        await MemberRepository.updateMember({ id: member.id, ...body });
    }

    static async deleteMember({ memberIdToDelete, member, clubId }: DeleteMemberPayload) {
        if (!member.isAdmin) {
            return { errorMessage: 'Unauthorized' };
        }

        if (!memberIdToDelete) {
            return { errorMessage: 'Member not found' };
        }

        // If the member is the only admin, delete the club
        // The requesting user will always be the last admin in this case
        const members = await MemberRepository.getMembersByClubId(clubId);

        if (members.length === 1 && members[0].isAdmin === member.isAdmin) {
            await ClubRepository.deleteClub(clubId);

            return { message: 'Club deleted' };
        }

        await MemberRepository.deleteMember(memberIdToDelete);

        return { message: 'Member deleted' };
    }
}

export default MemberService;