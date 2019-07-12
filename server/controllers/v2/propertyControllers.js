import PropertyModel from '../../models/v2/PropertyModel';
import ServerResponse from '../../responseSpec/spec';
import { dataUri } from '../../config/multerconfig';
import { uploader } from '../../config/cloudinaryConfig'

const { create, selectOneProperty } = PropertyModel;
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
   * @description View one property advert with details
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
      return badGetRequest(res, 404, { propertyId: 'Property advert not found' });
    } catch (err) {
      return next(err);
    }
  }


 }