import { NextFunction, Request, Response } from 'express';
import { authServices } from '../services';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const token = await authServices.login(body);
        res.json({ token: token });
    } catch (err) {
        next(err);
    }
};

export default { login };
