import { Router } from 'express';
import { helloWorldController } from '../controllers';

const router = Router();

router.get('/', helloWorldController.helloWorld);
router.get('/users', helloWorldController.getUsers);

export default router;
