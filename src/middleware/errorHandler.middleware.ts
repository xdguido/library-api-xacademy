import { NextFunction, Request, Response } from 'express';
import { Exception, ErrorCode } from '../lib/exception';

/**
 * Express middleware that handles errors and sends appropriate responses.
 *
 * @param {any} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns The Express response object.
 */
export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Exception) {
        return res.status(err.status).send(err);
    }
    console.error(err);
    const unknownErr = new Exception(ErrorCode.ServerError, { error_name: err.name });
    return res.status(500).send(unknownErr);
};
