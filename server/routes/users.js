import express from 'express';
import UsersController from '../controllers/v2/UsersController';
import validator from '../middleware/validation';



const router = express.Router();

const { signUp, login } = UsersController;

router.post('/signup', validator.auth, signUp);
router.post('/signin', validator.auth, login);


export default router;
