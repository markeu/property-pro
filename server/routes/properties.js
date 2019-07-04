import express from 'express';
import PropertyController from '../controllers/PropertyController';
import { postAdValidator, updateAdStatusValidator, updateAdDataValidator } from '../middleware/propertyValidation';


const router = express.Router();

const {
  createPropAd, updatePropertyAdData, updatePropertyAdStatus,
  deleteProperty, getAllProperty,
} = PropertyController;

router.get('/', getAllProperty);
router.post('/', postAdValidator, createPropAd);
router.patch('/:property-id', updateAdDataValidator, updatePropertyAdData);
router.patch('/:property-id/sold', updateAdStatusValidator, updatePropertyAdStatus);
router.delete('/:property-id', deleteProperty);


export default router;
