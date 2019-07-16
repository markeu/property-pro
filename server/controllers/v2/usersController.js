import UserModel from '../../../server/models/v2/UserModel';
import { encryptPassword, decryptPassword, generateToken } from '../../middleware/encrypt';
import { badPostRequest, successfulRequest } from '../../responseSpec/spec';
import pool from '../../db';


const {

    createUser,
  
} = UserModel;


/**
 *
 *
 * @export
 * @class UsersController
 */
export class UsersController {
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
    const value = {
      first_name: data.first_name, 
      last_name: data.last_name, 
      password: data.password, 
      email: data.email,
      phone_number: data.phone_number,
      address: data.address
    }
      try {
        const user  = await createUser(value)
        if (user) {
           const token = generateToken(user);
           const data = {...user, token }
          return res.status(201).send({
            status: 'success',
            data
          });
        }
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(400).send({
            status: 'error',
            data: 'email already exit'
          });
        }
        return res.status(400).send({
          status: 'error',
          data: 'Internal server error'
        });
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
              return res.status(404).json({
                status: 'error',
                message: 'Invalid login details',
              });
            }
        const passwordValid = await decryptPassword(data.password, rows[0].password);
    
            if (!passwordValid) {
              return res.status(400).json({
                status: 'error',
                message: 'Invalid login details',
              });
            }
        const userData = data;
       
        delete userData.password;
        const token = await generateToken(userData);
        return successfulRequest(res, 200, { id: data.id, token });
      } catch (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      }
    }
  } 

