import { MemberAttributes } from '../db/models/member.model';
import { ClubAttributes } from '../db/models/club.model';

export type CreateMemberPayload = Omit<MemberAttributes, 'createdAt' | 'id' | 'deletedAt' | 'updatedAt'>;

export interface MemberWithClubs extends MemberAttributes {
    club: ClubAttributes | null;
}