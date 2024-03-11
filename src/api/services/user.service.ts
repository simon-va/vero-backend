import bcryptjs from 'bcryptjs';
import User, { UserAttributes, UserOutput } from '../../db/models/user.model';
import { RegisterUserBody, UserWithMembersAndClubs } from '../../types/user';
import Member from '../../db/models/member.model';
import Club from '../../db/models/club.model';

class UserService {
    // This method sets the user data in the database
    static async registerUser(payload: RegisterUserBody): Promise<UserOutput> {
        const { password } = payload;

        const salt = bcryptjs.genSaltSync(10);

        const hashedPassword = bcryptjs.hashSync(password, salt);

        return await User.create({
            ...payload,
            password: hashedPassword
        });
    }

    static async getClubsByUserId(userId: UserAttributes['id']) {
        const user =  await User.findByPk(userId, {
            include: [{
                model: Member,
                as: 'members',
                include: [{
                    model: Club,
                    as: 'club'
                }]
            }]
        }) as UserWithMembersAndClubs | null;

        if (!user) {
            return null;
        }

        return user.members.map(({ club }) => ({ id: club.id, name: club.name }));
    }
}

export default UserService;