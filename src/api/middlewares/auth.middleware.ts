import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../../db/models/user.model';
import { AccessTokenPayload } from '../../types/auth';
import Member from '../../db/models/member.model';
import MemberService from '../services/member.service';

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

    static async verifyIsAdmin(req: Request, res: Response, next: NextFunction) {
        const { clubId } = req.params;

        const user = res.locals.user as User;

        const member = await MemberService.getMemberByUserAndClubId(user.id, Number(clubId));

        if (!member || !member.isAdmin) {
            res.status(401).json({ errorMessage: 'Unauthorized - The user is not an admin' });
        }

        res.locals.member = member;

        next();
    }
}

export default AuthMiddleware;