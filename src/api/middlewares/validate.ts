import { Request, Response, NextFunction } from 'express';
import Validator, { ValidationSchema } from 'fastest-validator';

export const validateBody = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const v = new Validator();

        const error = v.validate(req.body, schema);

        if (error) {
            res.status(400).json({
                errorMessage: 'Validation failed',
                errors: error
            });
        }

        next();
    };
};

export enum ParamValue {
    UserId = 'userId',
    ClubId = 'clubId',
    MemberId = 'memberId',
    TeamId = 'teamId'
}

export const validateParams = (paramValues: ParamValue[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const schema: ValidationSchema = {};

        paramValues.forEach((paramValue) => {
            schema[paramValue] = {
                required: true,
                type: 'string'
            };
        });

        const v = new Validator();

        const error = v.validate(req.params, schema);

        if (error) {
            res.status(400).json({
                errorMessage: 'Validation failed',
                errors: error
            });
        }

        next();
    };
};