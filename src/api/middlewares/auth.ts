import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import MemberRepository from '../../db/repositories/memberRepository';
import UserRepository from '../../db/repositories/userRepository';
import { AccessTokenPayload } from '../../types/auth';
import { UserAttributes } from '../../types/user';

export enum AuthType {
    NoToken,
    User,
    NoMember,
    IsAdmin
}

/*
 * The auth function validates some types of authentication
 * It automatically checks if the user has a valid access token and if the user is a member of a club
 * Check AuthType enum for the types of authentication
 */
export const auth = (types: AuthType[] = []) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!types.includes(AuthType.NoToken)) {
            const accessToken = req.headers['authorization']?.split(' ')[1];

            if (!accessToken) {
                return res
                    .status(400)
                    .json({ errorMessage: 'AccessToken not found' });
            }

            try {
                const decoded = jwt.verify(
                    accessToken,
                    'secret'
                ) as AccessTokenPayload;

                if (!decoded) {
                    return res.status(401).json({
                        errorMessage: 'Invalid token - Token expired'
                    });
                }

                res.locals.userId = decoded.userId;
            } catch (error) {
                console.error(error);

                return res.status(400).json({ errorMessage: 'Invalid token' });
            }
        }

        if (types.includes(AuthType.User)) {
            const userId: UserAttributes['id'] = res.locals.userId;

            const user = await UserRepository.getUserById(userId);

            if (!user) {
                return res.status(404).json({ errorMessage: 'User not found' });
            }

            res.locals.user = user;
        }

        if (
            !types.includes(AuthType.NoMember) ||
            types.includes(AuthType.IsAdmin)
        ) {
            const clubId = Number(req.params.clubId);
            const userId: UserAttributes['id'] = res.locals.userId;

            const member = await MemberRepository.getMemberByUserAndClubId(
                userId,
                clubId
            );

            if (!member) {
                return res.status(401).json({ errorMessage: 'Unauthorized' });
            }

            if (types.includes(AuthType.IsAdmin) && !member.isAdmin) {
                return res.status(401).json({ errorMessage: 'Unauthorized' });
            }

            res.locals.member = member;
        }

        next();
    };
};
