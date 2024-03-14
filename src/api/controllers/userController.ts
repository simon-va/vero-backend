import { NextFunction, Request, Response } from 'express';
import { CreationUserAttributes } from '../../types/user';
import UserService from '../services/userService';

class UserController {
    static async registerUser(req: Request, res: Response, next: NextFunction) {
        const payload: CreationUserAttributes = req.body;

        try {
            const user = await UserService.registerUser(payload);

            res.status(201).send(user);
        } catch (error) {
            next(error);
        }
    }

    static async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await UserService.loginUser(req.body);

            res.status(200).send({ token });
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;