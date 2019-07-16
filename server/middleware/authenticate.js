import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import ResponseSpec from '../responseSpec';

dotenv.config();
// const { badPostRequest } = ResponseSpec;

/**
   *
   * Verify user token
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {string} Token
   * @memberof encrypt
   */
export const verifyToken = (req, res, next) => {
	const bearerToken = req.headers.token;
	if (!bearerToken) {
		return res.status(400).send({
			message: 'no token provided',
		});
	}

	jwt.verify(bearerToken, '123456', (err, decoded) => {
		if (err) {
			return res.status(400).send({
				message: 'Fail to authenticate token',
			});
		}
		req.user = decoded;
		return next();
	});
};

