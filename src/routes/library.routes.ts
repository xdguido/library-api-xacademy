import { Router } from 'express';
import { libraryControllers } from '../controllers';

const router = Router();

router.post('/', libraryControllers.createLib);
router.get('/', libraryControllers.getAll);
router.get('/:libId', libraryControllers.getOne);
router.put('/:libId', libraryControllers.edit);
router.delete('/:libId', libraryControllers.remove);
router.post('/:libId/books', libraryControllers.createBook);

export default router;
