import pool from '../../db/index';

/**
 *
 *
 * @export
 * @class Flag
 */
export default class Flag {
/**
     *
     * Property model to create new Properties
     * @static
     * @param {object} report
     * @returns {object} flag data
     * @memberof flag
     */

  static async createFlag(report){
  const {
    property_id,
    reason,
    description,
    reported_by
  } = report;
  
	const { rows } = await pool.query(`INSERT INTO
          flag (property_id, reason, description, reported_by)
        VALUES($1, $2, $3, $4)
         RETURNING * `, [property_id, reason, description, reported_by]
  );
 return rows[0];
  };

  /**
   * @static
   * @description Method to select all flag advert with details
   * @param {number} id Id of the flag advert to be returned
   * @returns {array} All flagged advert in the DB
   * @memberof Properties
   */
  static async getFlagQuery() {
    const data = await pool.query(
      `SELECT * FROM flag`
      );
      console.log(data)
      return data.rows;
  }
}

  

 