class UserValidators {
  static signupValidator(req, res, next) {
    const {
      firstName,
      lastName,
      email,
      address,
      password,
    } = req.body;

    // First name validation
    if (firstName === undefined) {
      return res.status(400)
        .send({
          status: 'error',
          message: 'First name is required',
        });
    }

    if (typeof firstName !== 'string') {
      return res.status(400)
        .send({
          status: 'error',
          message: 'First name must be a string',
        });
    }
    if (!/^([A-Za-z]){2,25}$/.test(firstName)) {
      return res.status(400).json({
        status: 'error',
        message: 'First name must be an alphabet with length 2 to 25',
      });
    }

    // Last name validation
    if (lastName === undefined) {
      return res.status(400)
        .send({
          status: 'error',
          message: 'Last name is required',
        });
    }

    if (typeof lastName !== 'string') {
      return res.status(400)
        .send({
          status: 'error',
          message: 'Last name must be a string',
        });
    }
    if (!/^([A-Za-z-]){2,25}$/.test(lastName)) {
      return res.status(400).json({
        status: 'error',
        message: 'Last name must be an alphabet with length 2 to 25',
      });
    }

    // Email Validation
    if (!email) {
      return res.status(400)
        .send({
          status: 'error',
          message: 'your email is required',
        });
    }
    if (email.includes(' ')) {
      return res.status(400)
        .send({
          status: 'error',
          message: 'email cannot include space.',
        });
    }
    if (typeof email !== 'string') {
      return res.status(400)
        .send({
          status: 'error',
          message: 'email must be a string',
        });
    }
    const checkEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!checkEmailRegex.test(email)) {
      return res.status(400).send({
        status: 'error',
        message: 'email address format is invalid',
      });
    }
    // Password Validation
    if (!password) {
      return res.status(400)
        .send({
          status: 'error',
          message: 'your password is required',
        });
    }

    if (typeof password !== 'string') {
      return res.status(400)
        .send({
          status: 'error',
          message: 'password must be a string',
        });
    }

    if (password.includes(' ')) {
      return res.status(400)
        .send({
          status: 'error',
          message: 'password cannot contain spaces',
        });
    }
    if (password.length < 5 || password.length > 30) {
      return res.status(400).send({
        status: 'error',
        message: 'password should be 5 to 30 characters long',
      });
    }

    // Address Validation
    if (!address) {
      return res.status(400)
        .send({
          status: 'error',
          message: 'your address is required',
        });
    }

    if (typeof address !== 'string') {
      return res.status(400)
        .send({
          status: 'error',
          message: 'address must be a string',
        });
    }


    return next();
  }


  static signinValidator(req, res, next) {
    const {
      email,
      password,
    } = req.body;

    if (!email) {
      return res.status(400)
        .send({
          status: 'error',
          message: 'your email is required',
        });
    }

    if (typeof email !== 'string') {
      return res.status(400)
        .send({
          status: 'error',
          message: 'email must be a string',
        });
    }
    const checkEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!checkEmailRegex.test(email)) {
      return res.status(400).send({
        status: 'error',
        message: 'email address format is invalid',
      });
    }
    if (!password) {
      return res.status(400)
        .send({
          status: 'error',
          message: 'your password is required',
        });
    }
    if (typeof password !== 'string') {
      return res.status(400)
        .send({
          status: 'error',
          message: 'password must be a string',
        });
    }

    return next();
  }
}
const { signupValidator, signinValidator } = UserValidators;

export { signupValidator, signinValidator };
