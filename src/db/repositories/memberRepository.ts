import { CreationMemberAttributes, UpdateMemberPayload } from '../../types/member';
import Member from '../models/member';
import { UserAttributes } from '../../types/user';
import { ClubAttributes } from '../../types/club';

class MemberRepository {
    static async createMember(payload: CreationMemberAttributes) {
        return await Member.create(payload);
    }

    static async updateMember(payload: UpdateMemberPayload) {
        await Member.update(payload, { where: { id: payload.id } });
    }

    static async getMemberByUserAndClubId(userId: UserAttributes['id'], clubId: ClubAttributes['id']) {
        return await Member.findOne({ where: { userId, clubId } });
    }

    static async getMembersByClubId(clubId: ClubAttributes['id']) {
        return await Member.findAll({
            where: { clubId },
            attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
        });
    }

    static async deleteMember(memberId: Member['id']) {
        await Member.destroy({ where: { id: memberId } });
    }
}

export default MemberRepository;