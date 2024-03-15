import { ClubAttributes } from '../../types/club';
import {
    CreationMemberAttributes,
    UpdateMemberPayload
} from '../../types/member';
import { UserAttributes } from '../../types/user';
import Member from '../models/member';

class MemberRepository {
    static async createMember(payload: CreationMemberAttributes) {
        return await Member.create(payload);
    }

    static async updateMember(payload: UpdateMemberPayload) {
        await Member.update(payload, { where: { id: payload.id } });
    }

    static async getMemberByUserAndClubId(
        userId: UserAttributes['id'],
        clubId: ClubAttributes['id']
    ) {
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

    static async getMemberById(memberId: Member['id']) {
        return await Member.findByPk(memberId);
    }
}

export default MemberRepository;
