import express from 'express';
import UsersController from '../controllers/UsersController';
import { signupValidator } from '../middleware/userValidation';

const router = express.Router();

const { userSignup } = UsersController;

router.post('/:signup', signupValidator, userSignup);


export default router;
