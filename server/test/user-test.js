/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const secret = 'jhfhfhfjhjfjf'
import jwt from 'jsonwebtoken';
const token = jwt.sign({ email: 'koporate@gmail.com', password: 'mickey'},
	secret,
	{expiresIn: '24h'
	}
);
const Token = 'Bearer' + token;


chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

const validUser = {
	first_name: 'Mark',
	last_name: 'Lisaswa',
	email: 'mari@gmail.com',
	address: '0980989',
	is_admin: true,
	password: 're%@u&@#23ERfg'
};

const favUser = {
	first_name: 'Mark',
	last_name: 'Lisaswa',
	email: 'mariktaman@gmail.com',	
	is_admin: true,
	address: '0980989',
	password: 're%@u&@#23ERfg'
  };

const nullUser = {};
describe('Test for App landing page', () => {
	it('should return 200 success status', (done) => {
		chai.request(app)
			.get('/')
			.end((err, res) => {
				expect(res).to.have.status(200);
				res.body.should.be.a('object');
				expect(res.body.message).to.equal('Welcome to PropertyPro');
				done();
			});
	});
});
// TEST FOR USER-SIGNUP
describe('POST/api/v1/auth', () => {
	// Test for Email
	it('It should add user to the database', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(validUser)
			.end((err, res) => {
				expect(res).to.have.status(201);
				done();
			});
	});

	it('It should not add user to the database', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(nullUser)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
	
	it('It should return 400 for an undefined first name', (done) => {
		const _user = {
			last_name: 'kimutai',
			email: 'hez@gmail.com',
			address: '0980989',
			is_admin: true,
			password: 're%#23ERfg'
		  };
		
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(_user)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
	it('It should return 400 for an undefined last name', (done) => {
		const _user = {
			first_name: 'uche',
			email: 'hez@gmail.com',
			address: '0980989',
			is_admin: true,
			password: 're%#23ERfg'
		  };
		
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(_user)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
	it('It should return 400 for an undefined email', (done) => {
		const _user = {
			first_name: 'uche',
			last_name: 'mark',
			address: '0980989',
			is_admin: true,
			password: 're%#23ERfg'
		  };
		
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(_user)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
	it('It should return 400 for an undefined address', (done) => {
		const _user = {
			first_name: 'uche',
			last_name: 'mark',
			email: 'uchemark@gmail.com',
			is_admin: true,
			password: 're%#23ERfg'
		  };
		
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(_user)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
	it('It should return 400 for an undefined password', (done) => {
		const _user = {
			first_name: 'uche',
			last_name: 'mark',
			email: 'uchemark@gmail.com',
			is_admin: true,
		  };
		
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(_user)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
	it('It should return 400 for an non-string first_name', (done) => {
		const _user = {
			first_name: '7888665',
			last_name: 'mark',
			address: 'hdgfggfbn',
			email: 'uchemark@gmail.com',
			is_admin: true,
		  };
		
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(_user)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
	it('It should return 400 for an non-string last name', (done) => {
		const _user = {
			first_name: 'uche',
			last_name: '877889',
			address: 'udhhgdggd',
			email: 'uchemark@gmail.com',
			is_admin: true,
		  };
		
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(_user)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
});

// describe('Test User login', () => {
// 	it('Should login a user with valid inputs', (done) => {
// 	  chai.request(app)
// 			.post('/api/v1/auth/signup')
// 			.send(favUser)
// 			.end((err) => {
// 		  if (err) { console.log(err); }
// 		  chai.request(app)
// 					.post('/api/v1/auth/signin')
// 					.send({ email: 'mariktaman@gmail.com', password: 're%@u&@#23ERfg' })
// 					.end((err, result) => {
// 			  if (err) {
// 				console.log(err);
// 			  }
// 			  result.should.have.status(201);
// 			  done();
// 					});
// 			});
// 	});
// });  



// 	it('should return 400 status for a non string Email', (done) => {
// 		chai.request(app)
// 			.post('/api/v1/auth/signin')
// 			.send(nonStringEmailSignin)
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				expect(res.body.error).to.equal('email must be a string');
// 				done();
// 			});
// 	});


// 	// Tests for password
// 	it('should return 400 status for Undefined Password Signin', (done) => {
// 		chai.request(app)
// 			.post('/api/v1/auth/signin')
// 			.send(undefinedPasswordSignin)
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				res.body.should.be.a('object');
// 				expect(res.body.error).to.equal('your password is required');
// 				done();
// 			});
// 	});

// 	it('should return 400 status for a non string Password', (done) => {
// 		chai.request(app)
// 			.post('/api/v1/auth/signin')
// 			.send(nonStringPasswordSignin)
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				expect(res.body.error).to.equal('password must be a string');
// 				done();
// 			});
// 	});
// });


// // TEST FOR USER-SIGNUP
// describe('POST/api/v1/auth/signup', () => {
// 	// Test for First name
// 	it('should return 400 status for an undefined firstName', (done) => {
// 		chai.request(app)
// 			.post('/api/v1/auth/signup')
// 			.send(undefinedFirstName)
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				expect(res.body.error).to.equal('First name is required');
// 				done();
// 			});
// 	});
// });

// it('should return 400 status for a non string First Name', (done) => {
// 	chai.request(app)
// 		.post('/api/v1/auth/signup')
// 		.send(nonStringFirstName)
// 		.end((err, res) => {
// 			expect(res).to.have.status(400);
// 			expect(res.body.error).to.equal('First name must be a string');
// 			done();
// 		});
// });
// // Test for last name

// it('should return 400 status for an undefined first name', (done) => {
// 	chai.request(app)
// 		.post('/api/v1/auth/signup')
// 		.send(undefinedLastName)
// 		.end((err, res) => {
// 			expect(res).to.have.status(400);
// 			expect(res.body.error).to.equal('Last name is required');
// 			done();
// 		});
// });

// it('should return 400 status for a non string Last Name', (done) => {
// 	chai.request(app)
// 		.post('/api/v1/auth/signup')
// 		.send(nonStringLastName)
// 		.end((err, res) => {
// 			expect(res).to.have.status(400);
// 			expect(res.body.error).to.equal('Last name must be a string');
// 			done();
// 		});
// });
// it('should return 400 status for a last name char below 2 and above 25', (done) => {
// 	chai.request(app)
// 		.post('/api/v1/auth/signup')
// 		.send(invalidLastNameLength)
// 		.end((err, res) => {
// 			expect(res).to.have.status(400);
// 			expect(res.body.error).to.equal('Last name must be an alphabet with length 2 to 25');
// 			done();
// 		});
// });

// // Test for Email
// it('should return 400 status for an undefined first name', (done) => {
// 	chai.request(app)
// 		.post('/api/v1/auth/signup')
// 		.send(undefinedEmail)
// 		.end((err, res) => {
// 			expect(res).to.have.status(400);
// 			expect(res.body.error).to.equal('your email is required');
// 			done();
// 		});
// });
// it('should return 400 status for a non string email', (done) => {
// 	chai.request(app)
// 		.post('/api/v1/auth/signup')
// 		.send(nonStringEmail)
// 		.end((err, res) => {
// 			expect(res).to.have.status(400);
// 			expect(res.body.error).to.equal('email must be a string');
// 			done();
// 		});
// });

// // Test for password
// it('should return 400 status for an undefined password', (done) => {
// 	chai.request(app)
// 		.post('/api/v1/auth/signup')
// 		.send(undefinedPassword)
// 		.end((err, res) => {
// 			expect(res).to.have.status(400);
// 			expect(res.body.error).to.equal('your password is required');
// 			done();
// 		});
// });

// it('should return 400 status for a non string password', (done) => {
// 	chai.request(app)
// 		.post('/api/v1/auth/signup')
// 		.send(nonStringPassword)
// 		.end((err, res) => {
// 			expect(res).to.have.status(400);
// 			expect(res.body.error).to.equal('password must be a string');
// 			done();
// 		});
// });
// it('should return 400 status for password char below 2 and above 25', (done) => {
// 	chai.request(app)
// 		.post('/api/v1/auth/signup')
// 		.send(invalidPasswordLength)
// 		.end((err, res) => {
// 			expect(res).to.have.status(400);
// 			expect(res.body.error).to.equal('password should be 5 to 30 characters long');
// 			done();
// 		});
// });
