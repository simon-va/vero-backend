import Member, { MemberOutput } from '../../db/models/member.model';
import { CreateMemberPayload } from '../../types/member';

class MemberService {
    static async createMember(payload: CreateMemberPayload): Promise<MemberOutput> {
        return await Member.create(payload);
    }
}

export default MemberService;