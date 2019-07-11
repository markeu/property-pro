import pool from '../config';

/**
 *
 *
 * @export
 * @class Users
 */
export default class Users {
	/**
   *
   * User model to create user account
   * @static
   * @param {object} user
   * @returns {object} User data
   * @memberof Users
   */
static async createUser(user) {
    const {
        first_name,
        last_name,
        phone_number,
        email,
        address,
    } = user;
    let{role} = user;
    const {rows} = await pool.query(
        `INSERT INTO
    users
    ("first_name", "last_name", phone_number", "email", "address", role)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
        [first_name, last_name, phone_number, email, address, role]
    );
    return rows[0];
}
 /**
   *
   * User model to create user profile
   * @static
   * @param {object} userId
   * @returns {object} User Profile data
   * @memberof Users
   */ /**
   *
   * User model to create user profile
   * @static
   * @param {object} userId
   * @returns {object} User Profile data
   * @memberof Users
   */
  static async createProfile(userId) {
      const data = await pool.query(
          `INSERT INTO users_profile(
              "userId"
          )
          VALUES (
              $1
          ) RETURNING *`,
          [userId]
      );
      return data.rows[0];
  }

  /**
   *
   *
   * @static
   * @param {string} userData
   * @returns {object} User data according to supplied credential
   * @memberof Users
   */
  static async findUserInput(userData) {
      const column = userData.email
      const data = await pool.query(
        `SELECT * FROM users WHERE "${column}" = $1`,
        [userData]  
      );
        if (data.rowCount < 1) {
            return false;
        }
        return data.rows[0];
  }
}