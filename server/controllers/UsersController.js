import { signUp, getSpecificUser } from '../helpers/userHelper';

import Helper from '../middleware/helper';


class userController {
  static userSignup(req, res) {
    const { email } = req.body;
    const userExist = getSpecificUser(email);

    if (userExist) {
      return res.status(400).json({
        status: 'error',
        error: 'User already exist',
      });
    }

    const hashedPassword = Helper.hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const details = signUp(req.body);

    return res.status(201).json({

      status: 'success',
      data: details,
    });
  }

  static loginUser(req, res) {
    const { email } = req.body;
    const existingUser = getSpecificUser(email);

    if (!existingUser) {
      return res.status(401).json({
        status: 'error',
        error: 'Email not registered',
      });
    }
    const authenticatedUser = Helper.comparePassword(req.body.password, existingUser.password);


    if (!authenticatedUser) {
      return res.status(401).json({
        status: 'error',
        error: 'Wrong password',
      });
    }

    const existingUserDetails = {
      email: req.body.email,
      password: req.body.password,
    };

    Helper.generateToken(existingUserDetails);

    return res.status(200).json({
      status: 'success',
      data: existingUser,
    });
  }
}

export default userController;
