import { CreationUserAttributes, UserAttributes } from '../../types/user';
import User from '../models/user';

class UserRepository {
    static async getUserByEmail(email: UserAttributes['email']) {
        return await User.findOne({
            where: {
                email
            }
        });
    }

    static async getUserById(id: UserAttributes['id']) {
        return await User.findByPk(id);
    }

    static async registerUser(payload: CreationUserAttributes) {
        return await User.create(payload);
    }
}

export default UserRepository;
