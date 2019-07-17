/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const secret = 'jhfhfhfjhjfjf';
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
	email: 'mar@gmail.com',
	address: '0980989',
	password: 'mickey'
};

const favUser = {
	first_name: 'Mark',
	last_name: 'Lisaswa',
	email: 'mark@gmail.com',	
	is_admin: true,
	address: '0980989',
	password: 're%@u&@#23ERfg'
  };
  const signUser = {
	first_name: 'Mark',
	last_name: 'Lisaswa',
	email: 'uche@gmail.com',
	is_admin: true,
	address: '0980989',
	password: 'mickey'
  };

const nullUser = {};
describe('Test for App landing page', () => {
	it('should return 200 success status', (done) => {
		chai.request(app)
			.get('/')
			.end((_err, res) => {
				expect(res).to.have.status(200);
				res.body.should.be.a('object');
				expect(res.body.message).to.equal('Welcome to PropertyPro');
				done();
			});
	});
});
// TEST FOR USER-SIGNUP

describe('POST/api/v1/auth', () => {

	before((done) => {
		chai
		  .request(app)
		  .post('/api/v1/auth/signup')
		  .send(validUser)
		  .end(( res ) => {
			  console.log(res);
				done();
		  });
	  });
	

	// Test for Email

	it('It should add user to the database', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(favUser)
			.end((_err, res) => {
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

	it('Should login a user with valid inputs', (done) => {
			chai.request(app)
			  .post('/api/v1/auth/signin')
			  .send({ email: 'mar@gmail.com', password: 'mickey' })
			  .end((err, res) => {
				if (err) {
				  console.log(err);
				}
				expect(res).to.have.status(201);
				done();
			  });
		  });
		  it('Should login a user with invalid inputs', (done) => {
			chai.request(app)
			  .post('/api/v1/auth/signin')
			  .send({ email: 'mr@gmail.com', password: 'mickey' })
			  .end((err, res) => {
				if (err) {
				  console.log(err);
				}
				expect(res).to.have.status(404);
				done();
			  });
		  });

		  it('Should login a user with invalid inputs', (done) => {
			chai.request(app)
			  .post('/api/v1/auth/signin')
			  .send({  password: 'mickey' })
			  .end((err, res) => {
				if (err) {
				  console.log(err);
				}
				expect(res).to.have.status(400);
				done();
			  });
		  });

		  it('Should login a user with invalid inputs', (done) => {
			chai.request(app)
			  .post('/api/v1/auth/signin')
			  .send({  email: '', password: 'mickey'  })
			  .end((err, res) => {
				if (err) {
				  console.log(err);
				}
				expect(res).to.have.status(400);
				done();
			  });
		  });
	  });
	  
	

