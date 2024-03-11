import { UserAttributes } from '../db/models/user.model';

export interface AccessTokenPayload {
    email: UserAttributes['email'];
    userId: UserAttributes['id'];
}