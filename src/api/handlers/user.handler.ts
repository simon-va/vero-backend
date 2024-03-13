import { CreationUserAttributes, UserAttributes } from '../../types/user';
import UserRepository from '../../db/repositories/user.repository';
import jwt from 'jsonwebtoken';

class UserHandler {
    static async registerUser(payload: CreationUserAttributes) {
        const user = await UserRepository.registerUser(payload);

        const { id, firstName, lastName, email } = user;

        return { id, firstName, lastName, email };
    }

    static async loginUser({ email, id }: Pick<UserAttributes, 'email' | 'id'>) {
        return jwt.sign({
            email,
            userId: id
        }, 'secret');
    }
}

export default UserHandler;