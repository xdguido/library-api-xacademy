import { z } from 'zod';
import { librarySchema, bookSchema, userSchema } from '../middleware';

export type LibraryTypes = z.infer<typeof librarySchema>;
export type BookTypes = z.infer<typeof bookSchema>;
export type UserTypes = z.infer<typeof userSchema>;
