import { Request, Response, NextFunction } from 'express';
import Validator from 'fastest-validator';
import bcryptjs from 'bcryptjs';
import { LoginUserBody, RegisterUserBody } from '../../types/user';
import User from '../../db/models/user.model';

class UserMiddleware {
    // This middleware checks if the user already exists and if the payload is valid
    static async registerCheck(req: Request, res: Response, next: NextFunction) {
        const schema = {
            firstName: {
                required: true,
                type: 'string'
            },
            lastName: {
                required: true,
                type: 'string'
            },
            email: {
                required: true,
                type: 'string'
            },
            password: {
                required: true,
                type: 'string'
            }
        };

        const v = new Validator();
        const validationResponse = v.validate(req.body, schema);

        if (validationResponse !== true) {
            return res.status(400).json({
                errorMessage: 'Validation failed', errors: validationResponse
            });
        }

        const payload: RegisterUserBody = req.body;

        const user = await User.findOne({
            where: {
                email: payload.email
            }
        });

        if (user) {
            return res.status(409).json({ errorMessage: 'User already exists' });
        }

        next();
    }

    // This middleware checks if the user exists and if the payload is valid
    static async loginCheck(req: Request, res: Response, next: NextFunction) {
        // Validate body
        const schema = {
            email: {
                required: true,
                type: 'string'
            },
            password: {
                required: true,
                type: 'string'
            }
        };

        const v = new Validator();
        const validationResponse = v.validate(req.body, schema);

        if (validationResponse !== true) {
            return res.status(400).json({
                errorMessage: 'Validation failed', errors: validationResponse
            });
        }

        const { email, password }: LoginUserBody = req.body;

        // Check if user exists
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(404).json({ errorMessage: 'Invalid email or password' });
        }

        // Check if password is valid
        const hasValidPassword = bcryptjs.compareSync(password, user.password);

        if (!hasValidPassword) {
            return res.status(401).json({ errorMessage: 'Invalid email or password' });
        }

        res.locals.user = user;

        next();
    }
}

export default UserMiddleware;