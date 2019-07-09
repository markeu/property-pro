import users from '../models/user';


export const signUp = (data) => {
  const generateToken = Math.floor(Math.random() * 90000) + 10000;
  const newUser = {
    id: users.length + 1,
    token: generateToken,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    password: data.password,
    isAdmin: false,
  };
  users.push(newUser);
  return newUser;
};


export const getSpecificUser = (email) => {
  const specificUser = users.find(user => user.email === email);
  return specificUser;
};
