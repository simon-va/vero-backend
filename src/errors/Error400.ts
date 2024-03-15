import BaseError from './BaseError';

class Error400 extends BaseError {
    constructor(message: string, statusCode = 400, isOperational = true) {
        super(message, statusCode, isOperational);
    }
}

export default Error400;
