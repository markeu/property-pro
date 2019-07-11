import validationHelpers from '../utilities/validationHelper';
import { emailRegex, passwordRegex, descriptionRegex } from '../utilities/regexen';

const { checkForEmptyFields, checkPatternedFields, checkIntergerFields } = validationHelpers;

export default {
	auth: (req, res, next) => {
		const errors = [];
		const {
			first_name, last_name, email, password, address, phone_number
		} = req.body;

		if (req.path.includes('signup')) {
			errors.push(...checkForEmptyFields('first_name', first_name));
			errors.push(...checkForEmptyFields('last_name', last_name));
			errors.push(...checkForEmptyFields('address', address));
			errors.push(...checkForEmptyFields('phone_number', phone_number));
		}
		errors.push(...checkPatternedFields('email', email, emailRegex));
		errors.push(...checkPatternedFields('password', password, passwordRegex));
    
		if (errors.length) {
			return res.jsend.error({
				message: 'error',
				data: errors
			});
		}
		return next(); 
	},
}; 