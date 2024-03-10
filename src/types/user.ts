import { UserAttributes } from '../db/models/user.model';

export type RegisterUserBody = Pick<UserAttributes, 'firstName' | 'lastName' | 'email' | 'password'>;
export type LoginUserBody = Pick<UserAttributes, 'email' | 'password'>;