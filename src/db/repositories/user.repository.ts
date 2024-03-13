import User from '../models/user.model';
import { CreationUserAttributes, UserAttributes } from '../../types/user';
import bcryptjs from 'bcryptjs';
import Member from '../models/member.model';
import Club from '../models/club.model';

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
        const { password } = payload;

        const salt = bcryptjs.genSaltSync(10);

        const hashedPassword = bcryptjs.hashSync(password, salt);

        return await User.create({
            ...payload,
            password: hashedPassword
        });
    }

    static async getClubsByUserId(userId: UserAttributes['id']) {
        const user = await User.findByPk(userId, {
            include: [{
                model: Member,
                as: 'members',
                include: [{
                    model: Club,
                    as: 'club',
                    attributes: ['id', 'name']
                }]
            }]
        });

        if (!user) {
            return null;
        }

        return user.members?.map(({ club }) => club).filter(Boolean) || [];
    }
}

export default UserRepository;