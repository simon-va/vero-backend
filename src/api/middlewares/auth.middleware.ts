import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../../db/models/user.model';
import { AccessTokenPayload } from '../../types/auth';

class AuthMiddleware {
    static async verifyToken(req: Request, res: Response, next: NextFunction) {
        const accessToken = req.headers['authorization']?.split(' ')[1];

        if (!accessToken) {
            return res.status(401).json({ errorMessage: 'AccessToken not found' });
        }

        try {
            const decoded = jwt.verify(accessToken, 'secret') as AccessTokenPayload;

            if (!decoded) {
                return res.status(401).json({ errorMessage: 'Invalid token - Token not verified' });
            }

            const user = await User.findOne({ where: { id: decoded.userId } });

            if (!user) {
                return res.status(401).json({ errorMessage: 'Invalid token - user not found' });
            }

            res.locals.user = user;

            next();
        } catch (error) {
            console.error(error);

            res.status(400).json({ errorMessage: 'Invalid token' });
        }
    }
}

export default AuthMiddleware;