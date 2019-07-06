import {
  postAd, getAllProperty, getSpecificProperty,
  getSpecificPropType, changePropStatus, deleteOneProperty,
} from '../helpers/propertyHelper';
import property from '../models/property';
import { multerUploads, dataUri } from '../config/multerconfig';
import { uploader } from '../config/cloudinaryConfig'


// Post properties.
class propertyController {
  static createPropAd(req, res) {
    if(req.file) {
      const file = dataUri(req).content;
      return uploader.upload(file).then((result) => {
        const data = {...req.body, image_url: result.url}
        const newAd = postAd(data);
        return res.status(201).json({
          status: 'success',
          data: newAd,
        });
      })
    }
  }

  // Get all properties
  static getAllProperty(req, res) {
    const allProperty = getAllProperty();

    if (allProperty.length === 0) return res.status(404).send('There are no properties');

    if (!allProperty) {
      return res.status(404).send({
        status: 'error',
        error: 'There are no properties in this database',
      });
    }

    return res.status(200).send({
      status: 'success',
      message: 'All Property Ads retrieved successfully',
      data: allProperty,
    });
  }

  // Get specific property advert (type: property type)
  static getSpecificPropType(req, res) {
    const propType = req.params.propertyType;
    const property1 = getSpecificPropType(propType);
    if (!property1.length) {
      return res.status(404).json({
        status: 'error',
        message: 'Property Type does not exist',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: property1,
    });
  }

  // Get specific property ID
  static getSpecificProperty(req, res) {
    const propertyId = parseInt(req.params.propertyId, 10);
    console.log(propertyId, '===>> id');
    const property2 = getSpecificProperty(propertyId);
    if (!property2.length) {
      return res.status(404).json({
        status: 'error',
        message: 'Property does not exist',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Property Ad retrieved successfully',
      data: property2,
    });
  }

  // Update property status

  static updatePropertyAdStatus(req, res) {
    const { propertyId } = req.params;
    const { sold } = req.body;
    const property3 = changePropStatus(parseInt(propertyId, 10), sold);
    return res.status(200).json({
      status: 'success',
      data: property3,
    });
  }


  // Update property data

  static updatePropertyAdData(req, res) {
    const newPropUpdate = { ...req.body };
    const { propertyId } = req.params;
    const specificProperty = property.find(data => data.id === parseInt(propertyId, 10));
    const propertyIndex = property.indexOf(specificProperty);
    Object.assign(specificProperty, newPropUpdate);
    property.splice(propertyIndex, 1, specificProperty);


    return res.status(201).json({
      status: 'success',
      message: 'Property details updated successfully',
      data: specificProperty,
    });
  }

  // delete properties

  static deleteProperty(req, res) {
    const { propertyId } = req.params;
    const property4 = getSpecificProperty(parseInt(propertyId, 10));
    if (!property4.length) {
      return res.status(404).json({
        status: 'error',
        message: 'Property does not exist', 
      });
    }
    deleteOneProperty(parseInt(propertyId, 10));
    return res.status(202).json({
      status: 'Success',
      message: 'Property AD deleted successfully',

    });
  }
}
export default propertyController;
