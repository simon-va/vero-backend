import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';
import { CreationUserAttributes, UserAttributes } from '../../types/user';

class UserController {
    static async registerUser(req: Request, res: Response) {
        try {
            const payload: CreationUserAttributes = req.body;

            const user = await UserService.registerUser(payload);

            const { id, firstName, lastName, email } = user;

            res.status(201).json({ id, firstName, lastName, email });
        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }

    static async loginUser(req: Request, res: Response) {
        try {
            const user: UserAttributes= res.locals.user;

            // Sign token with user data
            const token = jwt.sign({
                email: user.email,
                userId: user.id
            }, 'secret');

            res.status(200).json({ token });
        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: 'Internal server error' });
        }
    }
}

export default UserController;