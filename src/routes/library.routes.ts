import { Router } from 'express';
import { libraryControllers } from '../controllers';
import { validate, validateJwt, librarySchema, bookSchema } from '../middleware';

const router = Router();

router.post('/', validateJwt, validate(librarySchema, false), libraryControllers.createLib);
router.get('/', libraryControllers.getAll);
router.get('/:libId', libraryControllers.getOne);
router.put('/:libId', validateJwt, validate(librarySchema, true), libraryControllers.edit);
router.delete('/:libId', validateJwt, libraryControllers.remove);
router.get('/:libId/restore', validateJwt, libraryControllers.restore);
router.post(
    '/:libId/books',
    validateJwt,
    validate(bookSchema, true),
    libraryControllers.createBook
);

export default router;
