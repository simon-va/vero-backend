import { CreationUserAttributes, LoginUserBody, UserAttributes } from '../../types/user';
import UserRepository from '../../db/repositories/userRepository';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

class UserService {
    static async registerUser(payload: CreationUserAttributes) {
        const user = await UserRepository.registerUser(payload);

        const { id, firstName, lastName, email } = user;

        return { id, firstName, lastName, email };
    }

    static async loginUser({ email, password }: Pick<UserAttributes, 'email' | 'password'>) {
        // Check if user exists
        const user = await UserRepository.getUserByEmail(email);

        if (!user) {
            return { errorMessage: 'Invalid email or password' };
        }

        // Check if password is valid
        const hasValidPassword = bcryptjs.compareSync(password, user.password);

        if (!hasValidPassword) {
            return { errorMessage: 'Invalid email or password' };
        }

        return jwt.sign({
            email,
            userId: user.id
        }, 'secret');
    }
}

export default UserService;