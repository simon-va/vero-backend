import Member, { MemberOutput } from '../../db/models/member.model';
import { CreateMemberPayload, UpdateMemberPayload } from '../../types/member';
import { UserAttributes } from '../../db/models/user.model';
import { ClubAttributes } from '../../db/models/club.model';

class MemberService {
    static async createMember(payload: CreateMemberPayload): Promise<MemberOutput> {
        return await Member.create(payload);
    }

    static async updateMember(payload: UpdateMemberPayload): Promise<void> {
        await Member.update(payload, { where: { id: payload.id } });
    }

    static async getMemberByUserAndClubId(userId: UserAttributes['id'], clubId: ClubAttributes['id']): Promise<MemberOutput | null> {
        return await Member.findOne({ where: { userId, clubId } });
    }
}

export default MemberService;