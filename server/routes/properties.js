import express from 'express';
import { multerUploads} from '../config/multerconfig';
import PropertyController from '../controllers/v2/propertyControllers';

import { postAdValidator, updateAdStatusValidator, updateAdDataValidator } from '../middleware/propertyValidation';

const router = express.Router();

const {
	createPropertyAd, updatePropertyAdData, updatePropertyAdStatus,
	deleteProperty, getAllProperty, getSpecificProperty, getSpecificPropType,
} = PropertyController;

router.post('/', multerUploads, createPropertyAd);
router.get('/', getAllProperty);
router.get('/:type/type', getSpecificPropType);
router.get('/:id', getSpecificProperty);
router.patch('/:id/sold', updatePropertyAdStatus);
router.patch('/:id', updatePropertyAdData);
router.delete('/:id', deleteProperty);


 
export default router;
