import express from 'express';
import PropertyController from '../controllers/PropertyController';
import { postAdValidator } from '../middleware/propertyValidation';


const router = express.Router();

const {
  createPropAd,
} = PropertyController;


router.post('/', postAdValidator, createPropAd);


export default router;
