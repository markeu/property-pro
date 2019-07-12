import PropertyModel from '../../models/v2/PropertyModel';
import ServerResponse from '../../responseSpec/spec';
import { dataUri } from '../../config/multerconfig';
import { uploader } from '../../config/cloudinaryConfig'

const { create, selectOneProperty, getPropQuery, getPropTypeQuery } = PropertyModel;
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
        try {
          const { owner, status, price, state, city, address, type, image_url } = req.body;
          const dataId = req.body;
          dataId.uploadedBy =req.user.id;
          if(req.file){
            const file = dataUri(req).content;
              await uploader.upload(file).then((result) => {
            const data = {...dataId, image_url: result.url}
        //     await create(data);
        //     return successfulRequest(res, 201, {
        //     id:          id,
        //     Owner:       owner,
        //     Status:      status,
        //     Price:       price,
        //     State:       state,
        //     City:        city,
        //     Address:     address,
        //     Type:        type,
        //     created_on:  created_on,
        //     image_url:   image_url
        //   });
        });
    }
} catch (err) {
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
        delete propertyDetails.uploadedBy;
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
      const allProperty = await getPropQuery();
      if (allProperty.length > 0) {
        const propertyDetails = allProperty.map((property) => {
            delete propertyDetails.uploadedBy;
          return property;
        });
        return successfulRequest(res, 200, propertyDetails);
      }
      return badGetRequest(res, 404, {
        message: 'There are no properties in this database'
      });
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
        delete propertyDetails.uploadedBy;
        return successfulRequest(res, 200, propertyDetails);
      }
        return badGetRequest(res, 404, { message: 'Property Type not found' });
    }catch (err) {
    return next(err);
    }
  }

 }