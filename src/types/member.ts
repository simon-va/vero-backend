import { Attributes, CreationAttributes } from 'sequelize';
import Member from '../db/models/member';

export type MemberAttributes = Attributes<Member>
export type CreationMemberAttributes = CreationAttributes<Member>

export type UpdateMemberPayload = Partial<MemberAttributes> & Pick<MemberAttributes, 'id'>