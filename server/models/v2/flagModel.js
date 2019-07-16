/**
 *
 *
 * @export
 * @class Property
 */
export default class Flag {
/**
     *
     * Property model to create new Properties
     * @static
     * @param {object} property
     * @returns {object} property data
     * @memberof Properties
     */

  static async await flag (report){
  const {
    property_id,
    reason,
    created_on,
    description,
    reportedBy
  } = user;
	const {rows} = await pool.query(`INSERT INTO
          flag (property_id, reason, created_on, description, reported_by)
        VALUES($1, $2, $3, $4, $5)
          returning * `, [property_id, reason, created_on, description, reportedBy]
 }
}
  
export default flagQueries;
  

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