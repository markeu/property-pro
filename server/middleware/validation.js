/* eslint-disable no-mixed-spaces-and-tabs */
import validationHelpers from '../utilities/validationHelper';
import { emailRegex, passwordRegex, descriptionRegex } from '../utilities/regexen';

const { checkForEmptyFields, checkPatternedFields, checkStringFields } = validationHelpers;

export default {
	auth: (req, res, next) => {
	  const errors = [];
	  const {
			first_name, last_name, email, password, address
	  } = req.body;


	  if (req.path.includes('signup')) {
			errors.push(...checkForEmptyFields('first_name', first_name ));
			errors.push(...checkForEmptyFields('last_name', last_name ));
			errors.push(...checkForEmptyFields('address', address ));
			errors.push(...checkStringFields('first_name', first_name ));
			errors.push(...checkStringFields('last_name', last_name ));
	  }
	  errors.push(...checkPatternedFields('email', email, emailRegex));
	  errors.push(...checkPatternedFields('Password', password, passwordRegex));
  
	  if (errors.length) {
			return res.status(400).json({
		  message: 'Error',
		  data: errors
			});
	  }
	  return next();
	},
	postValidator: (req, res, next) => {
	  const errors = [];
	  const {
			status, price, state, city, address, type,
	  } = req.body;
	  
	  errors.push(...checkForEmptyFields('status', status));
	  errors.push(...checkForEmptyFields('city', city));
	  errors.push(...checkForEmptyFields('address', address));
	  errors.push(...checkForEmptyFields('type', type));
	  errors.push(...checkForEmptyFields('state', state));
	  errors.push(...checkForEmptyFields('price', price));

	  if (errors.length) {
			return res.status(400).json({
		  message: 'Error',
		  data: errors
			});
	  }
	  return next();
	},
  
	statusValidator: (req, res, next) => {
		const errors = [];
		const { status } = req.body;
		
		errors.push(...checkForEmptyFields('status', status));
		
		if ( !errors.length) {
			return res.status(400).json({
				message: 'Error',
				data: errors
			  });
		}
		return next();
	  },







	checkPropertyParams: (req, res, next) => {
	  const { params: { id } } = req;
	  const parsedNumber = parseInt(id, 10);
	  const isInter = Number.isInteger(parsedNumber);
	  const isGreaterThanZero = parsedNumber > 0;
	
	  if (isInter && isGreaterThanZero) return next();
	  return res.jsend.error('Property ID must be an integer greater than zero');
	}
};
  
