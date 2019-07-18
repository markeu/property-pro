import express from 'express';
import { multerUploads} from '../config/multerconfig';
import PropertyController from '../controllers/v2/propertyControllers';
import validation from '../middleware/validation';
import tryCatch from '../middleware/tryCatchHandler';
import { verifyToken } from '../middleware/authenticate';
import FlagController from '../controllers/v2/flagsController';


const {
	createPropertyAd, updatePropertyAdData, updatePropertyAdStatus,
	deleteProperty, getAllProperty, getSpecificProperty, getSpecificPropType,
} = PropertyController;

const { flagAd, getAllFlag } = FlagController;

const router = express.Router();

router.post('/',  multerUploads, verifyToken, validation.postValidator, createPropertyAd);
router.get('/', getAllProperty);
router.get('/:type/type', getSpecificPropType);
router.get('/:id', getSpecificProperty);
router.patch('/:id/sold', verifyToken, updatePropertyAdStatus);
router.patch('/:id', verifyToken,  updatePropertyAdData);
router.delete('/:id', verifyToken, deleteProperty);
router.post('/:id/flag', verifyToken, validation.flagValidator, flagAd);
router.get('/flag', getAllFlag);


 
export default router;
