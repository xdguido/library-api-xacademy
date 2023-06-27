import { Router } from 'express';
import { bookControllers } from '../controllers';
import { validate, bookSchema } from '../middleware';

const router = Router();

router.post('/', validate(bookSchema, false), bookControllers.createBook);
router.get('/', bookControllers.getAll);
router.get('/:bookId', bookControllers.getOne);
router.put('/:bookId', validate(bookSchema, true), bookControllers.edit);
router.delete('/:bookId', bookControllers.remove);
router.get('/:bookId/restore', bookControllers.restore);

export default router;
