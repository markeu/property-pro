/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


/**
   *
   * Verify user token
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object | void } next
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

	jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(400).send({
				message: 'Fail to authenticate token',
			});
		}
		req.user = decoded;
		return next();
	});
};

