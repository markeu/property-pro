import express from 'express';
import PropertyController from '../controllers/PropertyController';
import { postAdValidator, updateAdDataValidator } from '../middleware/propertyValidation';


const router = express.Router();

const {
  createPropAd, updatePropertyAdData,
} = PropertyController;

router.post('/', postAdValidator, createPropAd);
router.patch('/:property-id', updateAdDataValidator, updatePropertyAdData);


export default router;
