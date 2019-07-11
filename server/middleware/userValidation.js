class UserValidators {
	static signupValidator(req, res, next) {
		const {
			first_name,
			last_name,
			email,
			address,
			password,
		} = req.body;

		// First name validation
		if (first_name == undefined) {
			return res.status(400)
				.send({
					status: 'error',
					error: 'First name is required',
				});
		}

		if (typeof first_name !== 'string') {
			return res.status(400)
				.send({
					status: 'error',
					error: 'First name must be a string',
				});
		}
		if (!/^([A-Za-z]){2,25}$/.test(first_name)) {
			return res.status(400).json({
				status: 'error',
				error:'First name must be an alphabet with length 2 to 25',
			});
		}

		// Last name validation
		if (last_name === undefined) {
			return res.status(400)
				.send({
					status: 'error',
					error: 'Last name is required',
				});
		}

		if (typeof last_name !== 'string') {
			return res.status(400)
				.send({
					status: 'error',
					error: 'Last name must be a string',
				});
		}
		if (!/^([A-Za-z-]){2,25}$/.test(last_name)) {
			return res.status(400).json({
				status: 'error',
				error: 'Last name must be an alphabet with length 2 to 25',
			});
		}

		// Email Validation
		if (!email) {
			return res.status(400)
				.send({
					status: 'error',
					error: 'your email is required',
				});
		}
		if (email.includes(' ')) {
			return res.status(400)
				.send({
					status: 'error',
					error: 'email cannot include space.',
				});
		}
		if (typeof email !== 'string') {
			return res.status(400)
				.send({
					status: 'error',
					error:'email must be a string',
				});
		}
		const checkEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (!checkEmailRegex.test(email)) {
			return res.status(400).send({
				status: 'error',
				error:'email address format is invalid',
			});
		}
		// Password Validation
		if (!password) {
			return res.status(400)
				.send({
					status: 'error',
					error: 'your password is required',
				});
		}

		if (typeof password !== 'string') {
			return res.status(400)
				.send({
					status: 'error',
					error: 'password must be a string',
				});
		}

		if (password.includes(' ')) {
			return res.status(400)
				.send({
					status: 'error',
					error: 'password cannot contain spaces',
				});
		}
		if (password.length < 5 || password.length > 30) {
			return res.status(400).send({
				status: 'error',
				error: 'password should be 5 to 30 characters long',
			});
		}

		// Address Validation
		if (!address) {
			return res.status(400)
				.send({
					status: 'error',
					error: 'your address is required',
				});
		}

		if (typeof address !== 'string') {
			return res.status(400)
				.send({
					status: 'error',
					error: 'address must be a string',
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
					error:'your email is required',
				});
		}

		if (typeof email !== 'string') {
			return res.status(400)
				.send({
					status: 'error',
					error: 'email must be a string',
				});
		}
		const checkEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (!checkEmailRegex.test(email)) {
			return res.status(400).send({
				status: 'error',
				error: 'email address format is invalid',
			});
		}
		if (!password) {
			return res.status(400)
				.send({
					status: 'error',
					error: 'your password is required',
				});
		}
		if (typeof password !== 'string') {
			return res.status(400)
				.send({
					status: 'error',
					error: 'password must be a string',
				});
		}

		return next();
	}
}
const { signupValidator, signinValidator } = UserValidators;

export { signupValidator, signinValidator };
