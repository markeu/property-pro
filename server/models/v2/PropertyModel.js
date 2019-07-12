import pool from '../../db/index';

/**
 *
 *
 * @export
 * @class Property
 */
export default class Properties {
    /**
     *
     * Property model to create new Properties
     * @static
     * @param {object} property
     * @returns {object} property data
     * @memberof Properties
     */
    static async create(property) {
      const {
        owner,
        status,
        price,
        state,
        city,
        address,
        type,
        image_url
      } = property;
      const { rows } = await pool.query(
        `INSERT INTO property
      ("owner", "status", "price", "state", 
      "city", "address", "type", "imgage_url") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
        [owner, status, price, state, city, address, type, image_url]
      );
      return rows[0];
    }
}