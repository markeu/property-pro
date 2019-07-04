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
}

export default userController;
