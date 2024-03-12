import { MemberAttributes } from '../db/models/member.model';
import { ClubAttributes } from '../db/models/club.model';

export type CreateMemberPayload = Omit<MemberAttributes, 'createdAt' | 'id' | 'deletedAt' | 'updatedAt'>;

export type UpdateMemberPayload =
    Partial<Omit<MemberAttributes, 'id' | 'updatedAt' | 'createdAt' | 'userId' | 'clubId'>>
    & Pick<MemberAttributes, 'id'>;

export interface MemberWithClubs extends MemberAttributes {
    club: ClubAttributes | null;
}