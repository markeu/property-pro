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
      `UPDATE property SET "status" = '${status}' 
      WHERE property.id = ${id} RETURNING *`
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
    `UPDATE property
    SET (owner=$1, status=$2, price=$3, state=$4, city=$5, 
    address=$6, type=$7, image_url=$8; ) [1, status, price, state, city, address, type, image_url] 
    WHERE property.id=${id} RETURNING *`);
    return rows[0];
  }

   /**
   *
   * Delete Property Advert
   * @static
   * @param {string} user_Id
   * @param {string} propertyId
   * @returns {object} Delete Property Advert
   * @memberof Properties
   */
  static async deleteProperty(user_Id, id) {
    const data = await pool.query(
      `DELETE FROM property 
    WHERE "user_Id" = $1 and "id" = $2 RETURNING *`,
      [user_Id, id]
    );
    if (data.rowCount < 1) return false;
    return data.rows[0];
  }
}

// [1, status, price, state, city, address, type, image_url]

// UPDATE Supplier
//    SET City = 'Oslo', Phone = '(0)1-953530', Fax = '(0)1-953555'
//  WHERE Id = 15
  // ( "SELECT * FROM property WHERE type= $1;", [type]);