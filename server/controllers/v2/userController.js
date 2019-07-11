import UserModel from './models/v2/Users';
import encrypt from '../middeleware/encrypt';
import ServerResponse from '../responseSpec/ServerResponse';


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
  static async signUp(req, res, next) {
      const data = req.body;
      const { password, email} = data;
      const getSpecificUser = await findUserInput(email);
      const deCapitaliseEmail = getSpecificUser.trim().toLowerCase(),

      if(deCapitaliseEmail) {
          return badPostRequest(res, 400, {
            email: 'Email already exists'
          });
      }
      data.password - encryptPassword(password);
      const user = await create(data);
      await createProfile(user.id);
      const userData = user;
      delete userData.password;
      const token = generateToken(userData)
      return successfulRequest(res, 201, { id: user.id, token });
    } 
      catch (err) {
      return next(err);
    }
}
