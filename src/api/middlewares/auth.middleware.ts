import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AccessTokenPayload } from '../../types/auth';
import UserRepository from '../../db/repositories/user.repository';
import MemberRepository from '../../db/repositories/member.repository';

class AuthMiddleware {
    static async verifyTokenWithUser(req: Request, res: Response, next: NextFunction) {
        const accessToken = req.headers['authorization']?.split(' ')[1];

        if (!accessToken) {
            return res.status(401).json({ errorMessage: 'AccessToken not found' });
        }

        try {
            const decoded = jwt.verify(accessToken, 'secret') as AccessTokenPayload;

            if (!decoded) {
                return res.status(401).json({ errorMessage: 'Invalid token - Token not verified' });
            }

            const user = await UserRepository.getUserById(decoded.userId);

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

    static async verifyTokenWithMember(req: Request, res: Response, next: NextFunction) {
        const accessToken = req.headers['authorization']?.split(' ')[1];


        if (!accessToken) {
            return res.status(401).json({ errorMessage: 'Invalid token - AccessToken not found' });
        }

        try {
            const decoded = jwt.verify(accessToken, 'secret') as AccessTokenPayload;

            if (!decoded) {
                return res.status(401).json({ errorMessage: 'Invalid token - Token not verified' });
            }

            const clubId = Number(req.params.clubId);

            if (!clubId) {
                return res.status(401).json({ errorMessage: 'Provide a clubId in params' });
            }

            const member = await MemberRepository.getMemberByUserAndClubId(decoded.userId, clubId);

            if (!member) {
                return res.status(401).json({ errorMessage: 'Invalid token - member not found' });
            }

            res.locals.member = member;
            res.locals.clubId = clubId;

            next();
        } catch (error) {
            console.error(error);

            res.status(400).json({ errorMessage: 'Invalid token' });
        }
    }
}

export default AuthMiddleware;