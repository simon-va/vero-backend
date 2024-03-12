import { Request, Response, NextFunction } from 'express';
import Member from '../../db/models/member.model';
import Validator from 'fastest-validator';

class TeamMiddleware {
    static async validateTeamCreation(req: Request, res: Response, next: NextFunction) {
        const member: Member = res.locals.member;

        if (!member.isAdmin) {
            return res.status(401).json({ errorMessage: 'Unauthorized' });
        }

        const schema = {
            name: {
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

        next();
    }
}

export default TeamMiddleware;