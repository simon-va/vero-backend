import { CreationUserAttributes, UserAttributes } from '../../types/user';
import UserRepository from '../../db/repositories/userRepository';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import BaseError from '../../errors/BaseError';
import Error400 from '../../errors/Error400';

class UserService {
    static async registerUser(payload: CreationUserAttributes) {
        const userExists = await UserRepository.getUserByEmail(payload.email);

        if (userExists) {
            throw new BaseError('Email already in use', 409, true);
        }

        const user = await UserRepository.registerUser(payload);

        const { id, firstName, lastName, email } = user;

        return { id, firstName, lastName, email };
    }

    static async loginUser({
        email,
        password
    }: Pick<UserAttributes, 'email' | 'password'>) {
        const user = await UserRepository.getUserByEmail(email);

        if (!user) {
            throw new Error400('Invalid email or password');
        }

        const hasValidPassword = bcryptjs.compareSync(password, user.password);

        if (!hasValidPassword) {
            throw new Error400('Invalid email or password');
        }

        return jwt.sign(
            {
                email,
                userId: user.id
            },
            'secret'
        );
    }
}

export default UserService;
