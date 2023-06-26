import { Router } from 'express';
import { libraryControllers } from '../controllers';
import { validate, librarySchema, bookSchema } from '../middleware';

const router = Router();

router.post('/', validate(librarySchema, false), libraryControllers.createLib);
router.get('/', libraryControllers.getAll);
router.get('/:libId', libraryControllers.getOne);
router.put('/:libId', validate(librarySchema, true), libraryControllers.edit);
router.delete('/:libId', libraryControllers.remove);
router.post('/:libId/books', validate(bookSchema, true), libraryControllers.createBook);

export default router;
