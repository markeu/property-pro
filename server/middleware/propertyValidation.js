
import { getSpecificProperty } from '../helpers/propertyHelper';

class PropertyValidators {
  static postAdValidator(req, res, next) {
    const {
      owner, status, price, state, city, address, type, owner_email , owner_phone_number
    } = req.body;
    if (!owner || !status || !price || !state || !city || !address || !type || !owner_email || !owner_phone_number  ) {
      return res.status(400).json({
        status: 'error',
        data: {
          message: 'All required fields are expected',
          requiredFields: ['owner', 'status', 'price', 'state', 'city', 'address', 'type','owner_email', 'owner_phone_number'],
        },
      });
    }
    const userOwner = parseFloat(owner);
    if (!Number(userOwner)) {
      return res.status(400)
        .json({
          status: 'error',
          error:  'Property owner must be a integer',
        });
    }
    const userPrice = parseFloat(price);
    if (!Number(userPrice)) {
      return res.status(400)
        .json({
          status: 'error',
          error:  'Property price is required to be an integer',
        });
    }

    return next();
  }


  static updateAdStatusValidator(req, res, next) {
    const { property_id } = req.params;
    const property = getSpecificProperty(parseInt(property_id, 10));
    if (!property.length) {
      return res.status(404).json({
        status: 'error',
        error:  'Property does not exist',
      });
    }
    const statusUpdate = { ...req.body };
    const expectedPropertyKey = ['status'];
    const request = Object.keys(statusUpdate);
    const responseKey = request.filter(key => !expectedPropertyKey.includes(key));
    if (responseKey.length) {
      return res.status(400).json({
        status: 'error',
        error:  'Status only requirred',

      });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400)
        .json({
          status: 'error',
          error:  'Property status is required',
        });
    }
    return next();
  }


  static updateAdDataValidator(req, res, next) {
    const { property_id } = req.params;
    const property = getSpecificProperty(parseInt(property_id, 10));
    if (!property.length) {
      return res.status(404).json({
        status: 'error',
        error:  'Property does not exist',
      });
    }

    const newPropUpdate = { ...req.body };
    const expectedPropertyKeys = [
      'owner',
      'status',
      'price',
      'state',
      'city',
      'address',
      'type',
      'created_on',
    ];
    const request = Object.keys(newPropUpdate);
    const responseKeys = request.filter(keys => !expectedPropertyKeys.includes(keys));
    if (responseKeys.length) {
      return res.status(400).json({
        status: 'error',
        error:  'Input the expected Property key(s)',

      });
    }


    return next();
  }
}
const { postAdValidator, updateAdStatusValidator, updateAdDataValidator } = PropertyValidators;


export { postAdValidator, updateAdStatusValidator, updateAdDataValidator };
