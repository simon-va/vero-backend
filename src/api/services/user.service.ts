import bcryptjs from 'bcryptjs';
import { User } from '../../db/models';
import { UserInput, UserOutput } from '../../db/models/user.model';

class UserService {
    // This method sets the user data in the database
    static async registerUser(payload: UserInput): Promise<UserOutput> {
        const { password } = payload;

        const salt = bcryptjs.genSaltSync(10);

        const hashedPassword = bcryptjs.hashSync(password, salt);

        return await User.create({
            ...payload,
            password: hashedPassword
        });
    }
}

export default UserService;