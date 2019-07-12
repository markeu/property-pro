import UserModel from '../../../server/models/v2/UserModel';
import encrypt from '../../middleware/encrypt';
import ServerResponse from '../../responseSpec/spec';
import pool from '../../db';


const { encryptPassword, decryptPassword, generateToken} = encrypt;
const {
    findUserInput,
    create,
    createProfile
} = UserModel;
const { badPostRequest, badGetRequest, successfulRequest } = ServerResponse;

/**
 *
 *
 * @export
 * @class UsersController
 */
export default class UsersController {
    /**
   * Signup middleware - Create User Account
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} Object containing token to the user
   * @memberof UsersController
   */

  static async signUp (req, res, next) {
      const data = req.body;
      const { password } = data;
      data.password = encryptPassword(password);

      const createQuery = `INSERT INTO
      users("first_name", "last_name", "email", "address", "password")
      VALUES($1, $2, $3, $4, $5)
      returning * `;

      const values = [
        req.body.first_name,
        req.body.last_name,
        (req.body.email).trim().toLowerCase(),
        req.body.address,
        data.password,
      ];
      try {
        const { rows } = await pool.query(createQuery, values);
        return res.status(201).send({
          status: 'success',
          data: rows[0].id,
        });
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          return badPostRequest(res, 400, {email: 'Email already exists'});
        }
        return badPostRequest(res, 400, { email: 'Failed signup'});
      }
    }
  
  /**
   *
   * Login Middleware - Logs user into the application
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} Object containing token to the user
   * @memberof UsersController
   */
    static async login(req, res, next) {
      try {
        const data = req.body;
        const query = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await pool.query(query, [req.body.email]);
            if (!rows[0]) {
              return badPostRequest(res, 404, { message: 'Invalid Login Details' });
            }
        const passwordValid = await decryptPassword(data.password, rows[0].password);
            if (!passwordValid) {
              return badPostRequest(res, 401, { message: 'Invalid Login Details' });
            }
        const userData = data;
        delete userData.password;
        const token = await generateToken(userData);
        return successfulRequest(res, 200, { id: data.id, token });
      } catch (err) {
        return next(err);
      }
    }
  } 

