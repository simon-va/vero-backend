import bcryptjs from 'bcryptjs';
import User from '../../db/models/user.model';
import Member from '../../db/models/member.model';
import Club from '../../db/models/club.model';
import { CreationUserAttributes, UserAttributes } from '../../types/user';

class UserService {
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

export default UserService;