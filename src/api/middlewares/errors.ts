import { NextFunction, Request, Response } from 'express';
import BaseError from '../../errors/BaseError';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof BaseError) {
        res.status(err.statusCode || 500).send({ errorMessage: err.message });
    }

    console.error(err);

    res.status(500).send('Internal server error');
};
