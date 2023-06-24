import { NextFunction, Request, Response } from 'express';
import { Exception, ErrorCode } from '../lib/error';

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Exception) {
        return res.status(err.status).send(err);
    }
    console.error(err);
    const unknownErr = new Exception(ErrorCode.ServerError, err.name);
    return res.status(500).send(unknownErr);
};
