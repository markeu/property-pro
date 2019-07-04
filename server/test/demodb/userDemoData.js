const validUser = {

  firstName: 'Ikenna',
  lastName: 'Mark',
  email: 'Ikennauche@yahoo.com',
  password: 'fredick',
  isAdmin: null,
};

const undefinedFirstName = {
  lastName: 'Mark',
  email: 'Ikennauche@yahoo.com',
  password: 'fredick',
};

const nonStringFirstName = {
  firstName: 567,
  lastName: 'Mark',
  email: 'Ikennauche@yahoo.com',
  address: 'Abuja',
  password: 'fredick',
};


const undefinedLastName = {
  firstName: 'Ikenna',
  email: 'Ikennauche@yahoo.com',
  address: 'Abuja',
  password: 'fredick',
};

const invalidLastNameLength = {
  firstName: 'Chioma',
  lastName: 'u',
  email: 'chiomab@yahoo.com',
  address: 'Lagos',
  password: '23434',
};

const nonStringLastName = {
  firstName: 'uche',
  lastName: 1223,
  email: 'Ikennauche@yahoo.com',
  address: 'Abuja',
  password: 'fredick',
};

const undefinedEmail = {
  firstName: 'uche',
  lastName: 'mark',
  address: 'Abuja',
  password: 'fredick',
};


const nonStringEmail = {
  firstName: 'uche',
  lastName: 'mark',
  email: ['Ikennauche@yahoo.com'],
  address: 'Abuja',
  password: 'fredick',
};


const undefinedPassword = {
  firstName: 'uche',
  lastName: 'mark',
  email: 'Ikennauche@yahoo.com',
};


const nonStringPassword = {
  firstName: 'uche',
  lastName: 'mark',
  email: 'Ikennauche@yahoo.com',
  address: 'Abuja',
  password: ['23434', '23434'],
};

const invalidPasswordLength = {
  firstName: 'uche',
  lastName: 'mark',
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
