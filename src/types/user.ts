import { Attributes, CreationAttributes } from 'sequelize';
import User from '../db/models/user.model';

export type UserAttributes = Attributes<User>
export type CreationUserAttributes = CreationAttributes<User>

export type LoginUserBody = Pick<UserAttributes, 'email' | 'password'>