import { Request, Response, NextFunction } from 'express';
import { z, AnyZodObject } from 'zod';
import { ErrorCode, Exception } from '../lib/exception';
import xss from 'xss';

export const librarySchema = z
    .object({
        id: z.number().optional(),
        name: z.string().transform((val) => xss(val)),
        location: z.string().transform((val) => xss(val)),
        phone: z.string().transform((val) => xss(val))
    })
    .strict();

export const bookSchema = z
    .object({
        id: z.number().optional(),
        isbn: z.number().optional(),
        title: z.string().transform((val) => xss(val)),
        author: z.string().transform((val) => xss(val)),
        year: z.string().transform((val) => xss(val)),
        libId: z.number().optional()
    })
    .strict();

export const userSchema = z
    .object({
        id: z.number().optional(),
        username: z.string().transform((val) => xss(val)),
        password: z.string().transform((val) => xss(val))
    })
    .strict();

export const validate =
    (schema: AnyZodObject, isPartial: boolean) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req;
            let result;
            if (isPartial) {
                result = schema.partial().safeParse(body);
            } else {
                result = schema.safeParse(body);
            }
            if (!result.success) {
                const formatted = result.error.format();
                throw new Exception(ErrorCode.BadRequest, formatted);
            }
            req.body = result.data;
            return next();
        } catch (err) {
            next(err);
        }
    };
