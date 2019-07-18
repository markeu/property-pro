import PropertyModel from '../../models/v2/PropertyModel';
import ServerResponse from '../../responseSpec/spec';
import { dataUri } from '../../config/multerconfig';
import { uploader } from '../../config/cloudinaryConfig';

const { create, selectOneProperty, getPropQuery, getPropTypeQuery,
        updateAdStatus,updateAdData, deleteOneProperty } = PropertyModel;
const { successfulRequest, badGetRequest } = ServerResponse;

/**
 *
 *
 * @export
 * @class PropertyController
 */
export default class PropertyController{
    /**
     * addProperty controller - Add new property advert
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @returns {object} propertyDetails
     * @memberof PropertyController
     */
  static async createPropertyAd (req, res, next) {
        try{    
          let image; 
            if(req.file) {
                const file = dataUri(req).content;
                image = await uploader.upload(file);
                
            } 
            const imageUrl = image || 'image'         
                if (imageUrl) {
                    const data = {...req.body, image_url: imageUrl.url || imageUrl, owner: req.user.id}
                    const newAd = await create(data);
                    return res.status(201).json({
                      status: 'success',
                      data: newAd
                    });
            }
        }catch (err) {
  		return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

  /**
   * @description Get specific property advert with id details
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} propertyDetails
   * @memberof PropertyController
   */
  static async getSpecificProperty(req, res, next) {
    try {
      const { id } = req.params;
      const propertyDetails = await selectOneProperty(parseInt(id, 10));
      if (propertyDetails) {
        return successfulRequest(res, 200, propertyDetails);
      }
        return badGetRequest(res, 404, { message: 'Property advert not found' });
    }catch (err) {
    return res.status(500).json({
      status: 'error',
      error: 'Internal server error',
    });
    }
  }

/**
   * @description Get all properties
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} propertiesDetails
   * @memberof PropertyController
   */
  static async getAllProperty(req, res, next) {
    try {
      const allProperties = await getPropQuery();
      if (allProperties.length > 0) {
        return successfulRequest(res, 200, allProperties);
      }
      return res.status(400).json({
        status: 'error',
        error: 'There are no properties in this database',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

  /**
   * @description Get specific property advert (type: property type)
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} propertiesDetails
   * @memberof PropertyController
   */
  static async getSpecificPropType(req, res, next) {
    try {
      const { type } = req.params;
      const propertyDetails = await getPropTypeQuery(type);
      if (!propertyDetails.length) { 
        return res.status(400).json({
        status: 'error',
        error: 'property type does not exist',
      });
    }
    return res.status(200).json({
        status: 'success',
        data: propertyDetails
      });
     }catch (err) {
       return res.status(500).json({
        status: 'error',
        error: 'Server error',
      });
    }
  }

/**
   * @description Update status of a property advert
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} updatedProperty details
   * @memberof PropertyController
   */
  static async updatePropertyAdStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const propToBeUpdated = await selectOneProperty(parseInt(id, 10));

      if (!propToBeUpdated) {
        return res.status(400).json({
         status: 'error',
         error: 'property does not exist',
       });
     }
      if(req.user.id != propToBeUpdated.owner) {
        return res.status(401).json({
          status: 'error',
          error: 'unauthorized to perform action',
        });
     }
      if (propToBeUpdated.status === status ) {
        return res.status(400).json({
          status: 'error',
          error: `property is already set to ${status}`,
        });
      }
      if (Object.keys(propToBeUpdated.status).length === 0) {
        return res.status(400).json({
          status: 'error',
          error: 'Status key must be defined',
        });
      }
      const data = {id, status};
      const updatedPropDetails = await updateAdStatus(data);
      return res.status(200).json({
        status: 'success',
        data: updatedPropDetails
      });
    } catch (err) {
  		return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

  /**
   * @description Update data of a property
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} updatedpropertyDetails
   * @memberof PropertyController
   */
  static async updatePropertyAdData(req, res, next) {
    try {
      const { id } = req.params;
      const dataFetch = { ...req.body };
      const propsToBeUpdated = await selectOneProperty(parseInt(id, 10));

      if (!propsToBeUpdated) {
        return res.status(400).json({
         status: 'error',
         error: 'property does not exist',
       });
     }  
     if ( req.user.id != propsToBeUpdated.owner)
      return res.status(401).json({
        status: 'error',
        error: 'unauthorized',
      });
     
      const newData = Object.assign(propsToBeUpdated, dataFetch);
      const updatedPropDetail = await updateAdData(newData, id);    
      return res.status(200).json({
        status: 'success',
        data: updatedPropDetail
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error'
      });
  }  
}

  /**
   *
   * Method to delete property advert
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} containing response to the user
   * @memberof PropertyController
   */
  static async deleteProperty(req, res) {
    const { id } = req.params;
    const propertyId = await selectOneProperty(id);
    if (!propertyId) {
      return res.status(400).json({
       status: 'error',
       error: 'property does not exist',
     });
   }   
   if ( req.user.id != propertyId.owner)
   return res.status(401).json({
     status: 'error',
     error: 'unauthorized',
   });

    const deletedProperty = await deleteOneProperty(id);
    if (deletedProperty) {
      return res.status(200).json({
        status: 'success',
        data: {message:'Property advert succesfully deleted'}
      });
    }
    return res.status(400).json({
      status: 'error',
      error: 'Internal server error'
    });
  }
 }

