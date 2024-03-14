import { UserAttributes } from './user';

export interface AccessTokenPayload {
    email: UserAttributes['email'];
    userId: UserAttributes['id'];
}
