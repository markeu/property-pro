/* eslint-disable no-mixed-spaces-and-tabs */
import validationHelpers from '../utilities/validationHelper';
import { emailRegex, passwordRegex, descriptionRegex } from '../utilities/regexen';

const { checkForEmptyFields, checkPatternedFields, checkStringFields, checkIntergerFields } = validationHelpers;

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
			errors.push(...checkForEmptyFields('Password', password ));
			errors.push(...checkStringFields('first_name', first_name ));
			errors.push(...checkStringFields('last_name', last_name ));
	  }
	  errors.push(...checkPatternedFields('email', email, emailRegex));
	  errors.push(...checkPatternedFields('Password', password, passwordRegex));
  
	  if (errors.length) {
			return res.status(400).json({
		  Status: 'Error',
		  Message: errors
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
	  errors.push(...checkStringFields('status', status));
	  errors.push(...checkStringFields('city', city));
	  errors.push(...checkStringFields('state', state));
	  errors.push(...checkIntergerFields('price', price));

	  if (errors.length) {
			return res.status(400).json({
		  Status: 'Error',
		  error: errors
			});
	  }
	  return next();
	},
  
	// statusValidator: (req, res, next) => {
	// 	const errors = [];
	// 	const { status } = req.body;
	// 	errors.push(...checkForEmptyFields('status', status));
		
	// 	if ( !errors.length) {
	// 		return res.status(400).json({
	// 			Status: 'Error',
	// 			Messsage: 'Status Value must be a string value of "Sold" or "Available"'
	// 		  });
	// 	}
	// 	return next();
	//   },

	  flagValidator: (req, res, next) => {
		const errors = [];
		const {
			 reason, description
		} = req.body;
		
		errors.push(...checkForEmptyFields('status', reason));
		errors.push(...checkForEmptyFields('city', description));
		errors.push(...checkStringFields('status', reason));
		errors.push(...checkStringFields('city', description, descriptionRegex));
  
		if (errors.length) {
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
  
