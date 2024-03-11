import { MemberAttributes } from '../db/models/member.model';

export type CreateMemberPayload = Omit<MemberAttributes, 'createdAt' | 'id' | 'deletedAt' | 'updatedAt'>;