import { Request, Response, NextFunction } from 'express';
import Member from '../../db/models/member.model';
import Validator from 'fastest-validator';

class MemberMiddleware {
    static async validateMemberUpdate(req: Request, res: Response, next: NextFunction) {
        const member: Member = res.locals.member;

        if (!member.isAdmin) {
            return res.status(401).json({ errorMessage: 'Unauthorized' });
        }

        // Validate body
        const schema = {
            firstName: {
                optional: true,
                type: 'string'
            },
            lastName: {
                optional: true,
                type: 'string'
            },
            email: {
                optional: true,
                type: 'email'
            },
            isAdmin: {
                optional: true,
                type: 'boolean'
            }
        }

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

export default MemberMiddleware;