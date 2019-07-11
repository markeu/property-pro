import users from '../models/user';
import encrypt from '../middleware/encrypt';



export const signUp = (data) => {
	const token = encrypt.generateToken({ id: users.length + 1, email: data.email });
	const newUser = {
		id: users.length + 1,
		token: token,
		email: data.email,
		first_name: data.first_name,
		last_name: data.last_name,
		address: data.address,
		password: data.password,
		is_admin: false,
	};
	users.push(newUser);
	
	return newUser;
};


export const getSpecificUser = (email) => {
	const specificUser = users.find(user => user.email === email);
	return specificUser;
};
