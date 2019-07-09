// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import {
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

  undefinedEmailSignin,
  nonStringEmailSignin,
  undefinedPasswordSignin,
  nonStringPasswordSignin,
} from './demodb/userDemoData';

// Configure chai
chai.use(chaiHttp);
const { should, expect  } = chai;
chai.should();
should();


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
// TEST FOR USER-SIGNIN
describe('POST/api/v1/auth', () => {
  // Test for Email
  it('should return 400 status for an undefined email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(undefinedEmailSignin)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('your email is required');
        done();
      });
  });


  it('should return 400 status for a non string Email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(nonStringEmailSignin)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('email must be a string');
        done();
      });
  });


  // Tests for password
  it('should return 400 status for Undefined Password Signin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(undefinedPasswordSignin)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body.error).to.equal('your password is required');
        done();
      });
  });

  it('should return 400 status for a non string Password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(nonStringPasswordSignin)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('password must be a string');
        done();
      });
  });
});


// TEST FOR USER-SIGNUP
describe('POST/api/v1/auth/signup', () => {
  // Test for First name
  it('should return 400 status for an undefined firstName', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(undefinedFirstName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('First name is required');
        done();
      });
  });
});

it('should return 400 status for a non string First Name', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(nonStringFirstName)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('First name must be a string');
      done();
    });
});
// Test for last name

it('should return 400 status for an undefined first name', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(undefinedLastName)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('Last name is required');
      done();
    });
});

it('should return 400 status for a non string Last Name', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(nonStringLastName)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('Last name must be a string');
      done();
    });
});
it('should return 400 status for a last name char below 2 and above 25', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(invalidLastNameLength)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('Last name must be an alphabet with length 2 to 25');
      done();
    });
});

// Test for Email
it('should return 400 status for an undefined first name', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(undefinedEmail)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('your email is required');
      done();
    });
});
it('should return 400 status for a non string email', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(nonStringEmail)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('email must be a string');
      done();
    });
});

// Test for password
it('should return 400 status for an undefined password', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(undefinedPassword)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('your password is required');
      done();
    });
});

it('should return 400 status for a non string password', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(nonStringPassword)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('password must be a string');
      done();
    });
});
it('should return 400 status for password char below 2 and above 25', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(invalidPasswordLength)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('password should be 5 to 30 characters long');
      done();
    });
});
