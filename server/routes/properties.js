import express from 'express';
import { multerUploads} from '../config/multerconfig';
import PropertyController from '../controllers/PropertyController';

import { postAdValidator, updateAdStatusValidator, updateAdDataValidator } from '../middleware/propertyValidation';

const router = express.Router();

const {
	createPropAd, updatePropertyAdData, updatePropertyAdStatus,
	deleteProperty, getAllProperty, getSpecificProperty, getSpecificPropType,
} = PropertyController;

router.get('/', getAllProperty);
router.get('/:property_type/type', getSpecificPropType);
router.get('/:property_id', getSpecificProperty);
router.post('/', multerUploads,  postAdValidator, createPropAd);
router.patch('/:property_id', updateAdDataValidator, updatePropertyAdData);
router.patch('/:property_id/sold', updateAdStatusValidator, updatePropertyAdStatus);
router.delete('/:property_id', deleteProperty);


 
export default router;
