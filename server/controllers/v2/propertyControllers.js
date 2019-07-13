import PropertyModel from '../../models/v2/PropertyModel';
import ServerResponse from '../../responseSpec/spec';
import { dataUri } from '../../config/multerconfig';
import { uploader } from '../../config/cloudinaryConfig';
import isEmpty from '../../helpers/isEmpty';

const { create, selectOneProperty, getPropQuery, getPropTypeQuery,updateAdStatus, updateAdData } = PropertyModel;
const { successfulRequest, badGetRequest, badPostRequest } = ServerResponse;
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
    static async createPropertyAd(req, res, next) {
        try{
            if(req.file) {
                const file = dataUri(req).content;
                const image = await uploader.upload(file);
                if (image) {
                    const data = {...req.body, image_url: image.url}
                    const newAd = await create(data);
                    return successfulRequest(res, 201, newAd);
                }
                return badPostRequest(res, 404, { message: 'Property Type not found' });
            }
        }catch (err) {
        return next(err);
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
    return next(err);
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
      return badGetRequest(res, 404, {message: 'There are no such property in this database'});
    } catch (err) {
      return next(err);
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
      if (propertyDetails) {
        return successfulRequest(res, 200, propertyDetails);
      }
        return badGetRequest(res, 404, { message: 'Property Type not found' });
    }catch (err) {
    return next(err);
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
      const data = {};
      console.log(status, '=======>');
      const propToBeUpdated = await selectOneProperty(parseInt(id, 10));
      if (isEmpty(propToBeUpdated)) {
        return badGetRequest(res, 404, { propertyId: 'Property not found' });
      }
      if (propToBeUpdated.status === status ) {
        return badPostRequest(res, 409, {
         status: `This property status is already ${ status }`
        });
      }
      data.id = id;
      data.status = status;
      console.log(data.status, '=======>');
      const updatedPropDetails = await updateAdStatus(data);
      return successfulRequest(res, 200, updatedPropDetails);
    } catch (err) {
      return next(err);
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
      const data = {};
      const propToBeUpdated = await selectOneProperty(parseInt(id, 10));
      if (isEmpty(propToBeUpdated)) {
        return badGetRequest(res, 404, { propertyId: 'Property not found' });
      }
      data.id = id;
      data.dataFetch = dataFetch;
      const updatedPropDetails = await updateAdData(data);
      return successfulRequest(res, 200, updatedPropDetails);
    } catch (err) {
      return next(err);
    }
  }  
  
 }