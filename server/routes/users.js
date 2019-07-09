import express from 'express';
import UsersController from '../controllers/UsersController';
import { signupValidator, signinValidator } from '../middleware/userValidation';


const router = express.Router();

const { userSignup, loginUser } = UsersController;

router.post('/signup', signupValidator, userSignup);
router.post('/signin', signinValidator, loginUser);


export default router;
