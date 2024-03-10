import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';
import { UserInput } from '../../db/models/user.model';

class UserController {
    // This method registers a new user
    static async registerUser(req: Request, res: Response) {
        try {
            const payload: UserInput = req.body;

            const user = await UserService.registerUser(payload);

            const { id, firstName, lastName, email } = user;

            res.status(201).json({ id, firstName, lastName, email });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // This method generates a token for the user
    static async loginUser(req: Request, res: Response) {
        try {
            const user = res.locals.user;

            // Sign token with user data
            const token = jwt.sign({
                email: user.email,
                userId: user.id
            }, 'secret');

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default UserController;