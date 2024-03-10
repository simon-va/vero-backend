import {UserInput, UserOutput} from "../models/user.model";
import {User} from "../models";

export const createUser = async (payload: UserInput): Promise<UserOutput> => {
    return await User.create(payload);
}