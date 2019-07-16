import FlagModel from '../../models/v2/flagModel';
import PropertyModel from '../../models/v2/PropertyModel';
const { createFlag, getFlagQuery } = FlagModel;

const { selectOneProperty } = PropertyModel;

/**
 *
 *
 * @export
 * @class FlagController
 */
export default class FlagController{
  /**
   * addProperty controller - Add new property advert
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} flagDetails
   * @memberof FlagController
   */
  
   static async flagAd(req, res, next) {
    try {
      const id = req.params.id;
      const propertyDetails = await selectOneProperty(parseInt(id, 10));
      if (!propertyDetails) {
        return res.status(404).send({
          status: 'error',
          message: 'Property advert not found'
        });
      }
      const data = { ...req.body, property_id: id , reported_by: req.user.id  };
      const report = await createFlag(data);
      return res.status(201).send({
        status: 'Success',
        data: report,
      });
    } catch (error) {
      return res.status(500).send({
        status: 'Error',
        error: 'This Ad could not be reported',
      });
    }
  }

  /**
   * @description Get all flagged property adverts
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} flagDetails
   * @memberof FlagController
   */
  static async getAllFlag(req, res) {
    try {
      const flaggedAdverts = await getFlagQuery();
      if (allFlag.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: flaggedAdverts,
        });
      }
      return res.status(400).json({
        status: 'error',
        message: 'There are no flagged advert in this database',
      });
    } catch (err) {
      return res.status(500).send({
        status: 'Error',
        error: 'Internal server Error',
      });
    }
  }
}


