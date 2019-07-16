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
        [owner, status, price, state, city, address, type, image_url]
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
    console.log(id, '______-------______');
    const data = await pool.query( "SELECT * FROM property WHERE id= $1;", [id]);
    console.log(data, '=======<<<<<<<< selected one')
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

  /**
   * @static
   * @description Method to update property ad status
   * @param {number} id Id of the property to be updated
   * @param {string} status new status of the property
   * @returns {object} Details of the newly updated property
   * @memberof Properties
   */
  static async updateAdStatus({ status, id }) {
    const data = await pool.query(
      `UPDATE property SET status= $1 
      WHERE id= $2 RETURNING *`, [status, id]
    );
    return data.rows[0];
  }

  /**
   * @static
   * @description update property advert data with details
   * @param {number} id Id of the property to be updated
   * @param {string} status new status of the property
   * @returns {object} Details of the newly updated property
   * @memberof Properties
   */
  static async updateAdData(property, id) {
    const {
      status,
      price,
      state,
      city,
      address,
      type,
      image_url
    } = property;
    const { rows } = await pool.query(
    `UPDATE property
    SET owner=1, status=$2, price=$3, state=$4, city=$5, address=$6, type=$7, image_url=$8 
    WHERE id=$1 RETURNING *`, [id, status, price, state, city, address, type, image_url]);
    return rows[0];
  }

   /**
   *
   * Delete Property Advert
   * @static
   * @param {string} userId
   * @param {string} propertyId
   * @returns {object} Delete Property Advert
   * @memberof Properties
   */
  static async deleteOneProperty(id) {
    const data = await pool.query("DELETE FROM property WHERE id= $1", [id]);
    if (data.rowCount === 1) return true;
    return false;
  }
}

