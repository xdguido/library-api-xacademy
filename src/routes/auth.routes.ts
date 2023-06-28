import { Router } from 'express';
import { authControllers } from '../controllers';
import { validate, userSchema } from '../middleware';

const router = Router();

router.post('/', validate(userSchema, false), authControllers.login);

export default router;
