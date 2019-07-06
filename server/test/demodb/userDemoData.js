const validUser = {

  first_name: 'Ikenna',
  last_name: 'Mark',
  email: 'Ikennauche@yahoo.com',
  password: 'fredick',
  is_admin: null,
};

const undefinedFirstName = {
  last_name: 'Mark',
  email: 'Ikennauche@yahoo.com',
  password: 'fredick',
};

const nonStringFirstName = {
  first_name: 567,
  last_name: 'Mark',
  email: 'Ikennauche@yahoo.com',
  address: 'Abuja',
  password: 'fredick',
};


const undefinedLastName = {
  first_name: 'Ikenna',
  email: 'Ikennauche@yahoo.com',
  address: 'Abuja',
  password: 'fredick',
};

const invalidLastNameLength = {
  first_name: 'Chioma',
  last_name: 'u',
  email: 'chiomab@yahoo.com',
  address: 'Lagos',
  password: '23434',
};

const nonStringLastName = {
  first_name: 'uche',
  last_name: 1223,
  email: 'Ikennauche@yahoo.com',
  address: 'Abuja',
  password: 'fredick',
};

const undefinedEmail = {
  first_name: 'uche',
  last_name: 'mark',
  address: 'Abuja',
  password: 'fredick',
};


const nonStringEmail = {
  first_name: 'uche',
  last_name: 'mark',
  email: ['Ikennauche@yahoo.com'],
  address: 'Abuja',
  password: 'fredick',
};


const undefinedPassword = {
  first_name: 'uche',
  last_name: 'mark',
  email: 'Ikennauche@yahoo.com',
};


const nonStringPassword = {
  first_name: 'uche',
  last_name: 'mark',
  email: 'Ikennauche@yahoo.com',
  address: 'Abuja',
  password: ['23434', '23434'],
};

const invalidPasswordLength = {
  first_name: 'uche',
  last_name: 'mark',
  email: 'Ikennauche@yahoo.com',
  address: 'Abuja',
  password: '2',
};


// sign in

const validSignIn = {
  email: 'uche@gmail.com',
  password: 'admin',
};

const undefinedEmailSignin = {
  password: 'fredick',
};


const nonStringEmailSignin = {
  email: ['Ikennauche@yahoo.com'],
  password: 'fredick',
};


const undefinedPasswordSignin = {
  email: 'Ikennauche@yahoo.com',
};

const nonStringPasswordSignin = {
  email: 'Ikennauche@yahoo.com',
  password: ['fredick'],
};


export {
  validUser,
  undefinedFirstName,
  nonStringFirstName,
  undefinedLastName,
  nonStringLastName,
  invalidLastNameLength,
  undefinedEmail,
  nonStringEmail,
  undefinedPassword,
  nonStringPassword,
  invalidPasswordLength,

  validSignIn,
  undefinedEmailSignin,
  nonStringEmailSignin,
  undefinedPasswordSignin,
  nonStringPasswordSignin,
};
