import bcrypt from 'bcrypt';


class Helper {
	static hashPassword(password) {
		const saltRounds = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, saltRounds);
	}

	static comparePassword(hashPassword, password) {
		return bcrypt.compareSync(hashPassword, password);
	}


	static generateToken() {
		const token = Math.floor(Math.random() * 90000) + 10000;
		return token;
	}
}

export default Helper;
