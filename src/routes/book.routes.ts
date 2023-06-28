import { Router } from 'express';
import { bookControllers } from '../controllers';
import { validate, validateJwt, bookSchema } from '../middleware';

const router = Router();

router.post('/', validateJwt, validate(bookSchema, false), bookControllers.createBook);
router.get('/', bookControllers.getAll);
router.get('/:bookId', bookControllers.getOne);
router.put('/:bookId', validateJwt, validate(bookSchema, true), bookControllers.edit);
router.delete('/:bookId', validateJwt, bookControllers.remove);
router.get('/:bookId/restore', validateJwt, bookControllers.restore);

export default router;
