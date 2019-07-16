import express from 'express';
import { multerUploads} from '../config/multerconfig';
import PropertyController from '../controllers/v2/propertyControllers';
import validation from '../middleware/validation';
import tryCatch from '../middleware/tryCatchHandler';
import { verifyToken } from '../middleware/authenticate';
import FlagController from '../controllers/v2/flagsController'


const {
	createPropertyAd, updatePropertyAdData, updatePropertyAdStatus,
	deleteProperty, getAllProperty, getSpecificProperty, getSpecificPropType,
} = PropertyController;

const { flagAd } = FlagController;

const router = express.Router();

router.post('/',  multerUploads, verifyToken, validation.postValidator, tryCatch(createPropertyAd));
router.get('/', tryCatch(getAllProperty));
router.get('/:type/type', tryCatch(getSpecificPropType));
router.get('/:id', tryCatch(getSpecificProperty));
router.patch('/:id/sold', verifyToken, tryCatch(updatePropertyAdStatus));
router.patch('/:id', verifyToken,  tryCatch(updatePropertyAdData));
router.delete('/:id', verifyToken, tryCatch(deleteProperty));
router.post('/:flag',  tryCatch(flagAd));


 
export default router;
