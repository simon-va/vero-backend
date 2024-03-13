import { Request, Response } from 'express';
import { CreationUserAttributes, UserAttributes } from '../../types/user';
import UserHandler from '../handlers/user.handler';

class UserController {
    static async registerUser(req: Request, res: Response) {
        try {
            const payload: CreationUserAttributes = req.body;

            const userData = await UserHandler.registerUser(payload);

            res.status(201).json(userData);
        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }

    static async loginUser(req: Request, res: Response) {
        try {
            const user: UserAttributes= res.locals.user;

            // Sign token with user data
            const token = await UserHandler.loginUser(user);

            res.status(200).json({ token });
        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }
}

export default UserController;