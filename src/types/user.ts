import { UserAttributes } from '../db/models/user.model';
import { MemberWithClubs } from './member';

export type RegisterUserBody = Pick<UserAttributes, 'firstName' | 'lastName' | 'email' | 'password'>;
export type LoginUserBody = Pick<UserAttributes, 'email' | 'password'>;

export interface UserWithMembersAndClubs extends UserAttributes {
    members: MemberWithClubs[];
}