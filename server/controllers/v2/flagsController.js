import pool from '../../db/index'
import flagQueries from '../../models/v2/flagModel';


class FlagController {
  static async flagAd(req, res) {
    try {
      const values = [
        req.body.property_id,
        req.body.reason,
        req.body.description,
        req.body.reportedBy,
      ];

      const { rows } = await pool.query(flagQueries.createQuery, values);
      return res.status(201).send({
        status: 201,
        message: 'property ad reported successfully',
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: 'This Ad could not be reported',
      });
    }
  }
}

export default FlagController;

