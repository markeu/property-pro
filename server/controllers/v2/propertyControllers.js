import PropertyModel from '../../models/v2/PropertyModel';
import ServerResponse from '../../responseSpec/spec';
import { dataUri } from '../../config/multerconfig';
import { uploader } from '../../config/cloudinaryConfig'

const { create } = PropertyModel;
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
    }