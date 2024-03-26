import { NextFunction, Request, Response } from 'express';
import Validator, {
    ValidationError,
    ValidationSchema
} from 'fastest-validator';

export const validateBody = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const v = new Validator();

        const error = v.validate(req.body, schema) as true | ValidationError[];

        if (error !== true) {
            return res.status(400).json({
                errorMessage:
                    'Validation failed - provide correct data in body',
                errors: error.map((err) => err.message)
            });
        }

        next();
    };
};

export enum ParamValue {
    UserId = 'userId',
    ClubId = 'clubId',
    MemberId = 'memberId',
    GroupId = 'groupId',
    ModuleId = 'moduleId'
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

        const error = v.validate(req.params, schema) as
            | true
            | ValidationError[];

        if (error !== true) {
            res.status(400).json({
                errorMessage: 'Validation failed - provide correct params',
                errors: error.map((err) => err.message)
            });
        }

        next();
    };
};
