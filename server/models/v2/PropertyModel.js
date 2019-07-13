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
      (owner, status, price, state, city, address, type, image_url) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
        [1, status, price, state, city, address, type, image_url]
      );
      return rows[0];
    }

  /**
   * @static
   * @description Method to select one specific property advert
   * @param {number} id Id of the property to be returned
   * @returns {object} Single property advert details
   * @memberof Properties
   */
  static async selectOneProperty(id) {
    const data = await pool.query(
      `SELECT * FROM property WHERE id = ${id}`
    );
    (data.rows[0]);
    return data.rows[0];
  }
  /**
   * @static
   * @description Method to select all properties with details
   * @param {number} id Id of the property to be returned
   * @returns {array} All properties in the DB
   * @memberof Properties
   */
  static async getPropQuery() {
    const data = await pool.query(
      `SELECT * FROM property`
      );
      console.log(data)
      return data.rows;
  }
    /**
   * @static
   * @description Method to select all properties with same property type
   * @param {number} id Id of the property to be returned
   * @returns {array} All same properties type in the DB
   * @memberof Properties
   */
  static async getPropTypeQuery(type) {
    const data = await pool.query( "SELECT * FROM property WHERE type= $1;", [type]);
    return data.rows;
  }

}
