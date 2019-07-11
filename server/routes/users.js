import express from 'express';
import UsersController from '../controllers/v2/UsersController';
import validator from '../middleware/validation';



const router = express.Router();

const { signUp } = UsersController;

router.post('/signup', validator.auth, signUp);
// router.post('/signin', signinValidator, loginUser);


export default router;
