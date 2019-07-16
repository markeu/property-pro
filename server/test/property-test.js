/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */

// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import config from '../test/config';

const secret = 'jhfhfhfjhjfjf';
import jwt from 'jsonwebtoken';
const token = jwt.sign({ email: 'koporate@gmail.com', password: 'mickey'},
	secret,
	{expiresIn: '24h'
	}
);
const Token = 'Bearer' + token;

// Configure chai
chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();
 
//Test to post property
const validProperty = {
	status: 'Available',
	price: '7000.00',
	state: 'Imo',
	type: 'flat',
	city: 'aowerri',
	address: '76768uuhygygyb',
	image_url: 'https://res.cloudinary.com/hezzie/image/upload/v2561036548/PropertyProLiteAPI/2019-06-20T13:15:46.472Z.png'
};

describe('Post a Property advert', () => {
	let token;
	const validUser = {
		first_name: 'Mark',
		last_name: 'Lisaswa',
		email: 'tk@gmail.com',
		address: '0980989',
		is_admin: true,
		password: '23ERfg'
	};

	before((done) => {
		chai
		  .request(app)
		  .post('/api/v1/auth/signup')
		  .send(validUser)
		  .end((err, res) => {
				token = res.body.data.token;
				console.log(res.body.data.token);
				done();
		  });
	  });

	// it('Should add a valid advert to the db', (done) => {
	//   chai.request(app)
	// 		.post('/api/v1/property')
	// 		.set('token', token)
	// 		.send(validProperty)
	// 		.end((_err, res) => {
	// 			console.log(res.body);
	// 	  res.should.have.status(201);
	// 	  done();
	// 		});
	// });
	
// 	it('Should add a valid advert to the db', (done) => {
// 	  chai.request(app)
// 			.post('/api/v1/property  ')
// 			.set('token', token)
// 			.send({status: 'sold'})
// 			.end((_err, res) => {
// 				console.log(res.body);
// 		  res.should.have.status(201);
// 		  done();
// 			});
// 	});
// });

// // Test for GET all properties.

// describe('Fetch  properties', () => {
// 	it('Should Get all the properties', (done) => {
// 	  chai.request(app)
// 			.get('/api/v1/property')
// 			.end((_err, result) => {
// 		  result.should.have.status(200);
// 		  done();
// 			});
// 	});

// 	it('Should no Get a null property', (done) => {
// 		chai.request(app)
// 		  .get('/api/v1/property/5')
// 		  .end((_err, result) => {
// 				result.should.have.status(404);
// 				done();
// 		  });
// 	  });	

// 	  it('Should not fetch a null property type', (done) => {
// 		chai.request(app)
// 		  .get('/api/v1/property/flays/type')
// 		  .end((_err, result) => {
// 				result.should.have.status(404);
// 				done();
// 		  });
// 	  }); 
// });












// // Test for POST properties
// describe('POST /api/v1/property', () => {
// 	it('it should return 400 status if owner is undefined', (done) => {
// 		chai.request(app)
// 			.post('/api/v1/property')
// 			.send(undefinedOwner)
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				done();
// 			});
// 	});


// 	it('it should return 400 status if status is undefined', (done) => {
// 		chai.request(app)
// 			.post('/api/v1/property')
// 			.send(undefinedStatus)
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				done();
// 			});
// 	});

// 	it('it should return 400 status if property price is undefined', (done) => {
// 		chai.request(app)
// 			.post('/api/v1/property')
// 			.send(undefinedPrice)
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				done();
// 			});
// 	});

// 	it('it should return 400 status if property state is undefined', (done) => {
// 		chai.request(app)
// 			.post('/api/v1/property')
// 			.send(undefinedState)
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				done();
// 			});
// 	});

// 	it('it should return 400 status if property image is undefined', (done) => {
// 		chai.request(app)
// 			.post('/api/v1/property')
// 			.send(undefinedImageUrl)
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				done();
// 			});
// 	});
// 	it('it should return 400 status if property type is undefined', (done) => {
// 		chai.request(app)
// 			.post('/api/v1/property')
// 			.send(undefinedType)
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				done();
// 			});
// 	});

// 	it('it should return 400 status if property address is not defined', (done) => {
// 		chai.request(app)
// 			.post('/api/v1/property')
// 			.send(undefinedAddress)
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				done();
// 			});
// 	});
// 	it('it should return 400 status if property city is undefined', (done) => {
// 		chai.request(app)
// 			.post('/api/v1/property')
// 			.send(undefinedCity)
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				done();
// 			});
// 	});
// });

// // Test to get single property
// describe('/GET a property by the id', () => {
// 	it('it should get a specific property by the given id', (done) => {
// 		const propId = '/api/v1/property/1';
// 		chai.request(app)
// 			.get(propId)
// 			.end((err, res) => {
// 				res.body.should.be.a('object');
// 				res.should.have.status(200);
// 				done();
// 			});
// 	});
// 	it('it should not get any property as ID does not exist', (done) => {
// 		const id = '/api/v1/property/12';
// 		chai.request(app)
// 			.get(id)
// 			.end((err, res) => {
// 				res.body.should.be.a('object');
// 				res.should.have.status(404);
// 				done();
// 			});
// 	});
// });

// // Test to get specific property type
// describe('/GET a property by the property type ', () => {
// 	it('it should get a specific property by the property type', (done) => {
// 		const type = 'flat';
// 		chai.request(app)
// 			.get(`/api/v1/property/${type}/type`)
// 			.end((err, res) => {
// 				res.body.should.be.a('object');
// 				res.should.have.status(200);
// 				done();
// 			});
// 	});

// 	it('it should indicate that property type does not exist', (done) => {
// 		const type = 'high rising';
// 		chai.request(app)
// 			.get(`/api/v1/property/${type}/propertyType`)
// 			.end((err, res) => {
// 				res.body.should.be.a('object');
// 				res.should.have.status(404);
// 				done();
// 			});
// 	});
// });

// //   Test to update property status
// describe('/PATCH update property status', () => {
// 	it('it should update a specific property status', (done) => {
// 		const updateUrl = '/api/v1/property/1/sold';
// 		chai.request(app)
// 			.patch(updateUrl)
// 			.send({ status: 'sold' })
// 			.end((err, res) => {
// 				expect(res).to.have.status(200);
// 				res.body.should.be.a('object');
// 				done();
// 			});
// 	});

// 	it('it should not update property status if ID is not found', (done) => {
// 		const updateUrl = '/api/v1/property/15/sold';
// 		chai.request(app)
// 			.patch(updateUrl)
// 			.send({ status: 'sold' })
// 			.end((err, res) => {
// 				expect(res).to.have.status(404);
// 				res.body.should.be.a('object');
// 				done();
// 			});
// 	});
// 	it('it should not update property status if key provided is not only status', (done) => {
// 		const updateUrl = '/api/v1/property/1/sold';
// 		chai.request(app)
// 			.patch(updateUrl)
// 			.send({ status: 'sold', owner: 5 })
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				res.body.should.be.a('object');
// 				done();
// 			});
// 	});
// });


// // Test to update property data
// describe('/PATCH update property data', () => {
// 	it('it should update the property data', (done) => {
// 		const updateDataUrl = '/api/v1/property/1';
// 		chai.request(app)
// 			.patch(updateDataUrl)
// 			.send({
// 				owner: 2,
// 				status: 'sold',
// 				price: 12000,
// 				state: 'Abia',
// 				city: 'aba',
// 				type: 'flat',
// 				address: '24b umule road',
// 				created_on: new Date(),
// 			})
// 			.end((err, res) => {
// 				expect(res).to.have.status(201);
// 				res.body.should.be.a('object');
// 				done();
// 			});
// 	});

// 	it('it should not update data if wrong property key is inputed ', (done) => {
// 		const updateDataUrl = '/api/v1/property/1';
// 		chai.request(app)
// 			.patch(updateDataUrl)
// 			.send({
// 				owner: 2,
// 				status: 'sold',
// 				price: 12000,
// 				state: 'Abia',
// 				city: 'aba',
// 				type: 'flat',
// 				address: '24b umule road',
// 				image_url: 'https://myimage@.com',
// 			})
// 			.end((err, res) => {
// 				expect(res).to.have.status(400);
// 				res.body.should.be.a('object');
// 				done();
// 			});
// 	});

// 	it('it should not update data if property id is not found ', (done) => {
// 		const updateDataUrl = '/api/v1/property/12';
// 		chai.request(app)
// 			.patch(updateDataUrl)
// 			.send({
// 				owner: 2,
// 				status: 'sold',
// 				price: 12000,
// 				state: 'Abia',
// 				city: 'aba',
// 				type: 'flat',
// 				address: '24b umule road',
// 				created_on: new Date(),
// 			})
// 			.end((err, res) => {
// 				expect(res).to.have.status(404);
// 				res.body.should.be.a('object');
// 				done();
// 			});
// 	});
// });

// // Test to delete property AD
// describe('/DELETE a by their id', () => {
// 	it('it should delete a property advert by their id', (done) => {
// 		const delDataUrl = '/api/v1/property/3';
// 		chai.request(app)
// 			.delete(delDataUrl)
// 			.end((err, res) => {
// 				expect(res).to.have.status(202);
// 				res.body.should.have.a('object');
// 				done();
// 			});
// 	});


// 	it('it should not delete property if propertyId is not found', (done) => {
// 		const delDataUrl = '/api/v1/property/31';
// 		chai.request(app)
// 			.delete(delDataUrl)
// 			.end((err, res) => {
// 				expect(res).to.have.status(404);
// 				res.body.should.have.a('object');
// 				done();
// 			});
// 	});
// });
