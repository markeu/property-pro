import express from 'express';
import { UsersController } from '../controllers/v2/UsersController';
import { auth } from '../middleware/validation';
import validation from '../middleware/validation';

import tryCatch from '../middleware/tryCatchHandler';



const router = express.Router();

const { signUp, login } = UsersController;


router.post('/signup', validation.auth,  tryCatch(signUp));
router.post('/signin',  validation.auth, tryCatch(login));


export default router;
