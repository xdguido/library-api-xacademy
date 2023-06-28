import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ErrorCode, Exception } from '../lib/exception';

export const SERVER_SECRET = 'topsecret';

// auth system with one admin user
export const USERNAME = 'admin';
export const PASSWORD = 'admin';

passport.use(
    new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: SERVER_SECRET
        },
        (jwtPayload, done) => {
            const user = jwtPayload;
            return done(null, user);
        }
    )
);

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    return passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
        if (err) {
            next(err);
        }
        if (!user) {
            throw new Exception(ErrorCode.Unauthenticated, {
                message: 'Please authenticate yourself'
            });
        }
        if (user.username === USERNAME) {
            req.user = user;
            return next();
        } else {
            throw new Exception(ErrorCode.Forbidden, {
                message: 'Not authorized'
            });
        }
    })(req, res, next);
};
