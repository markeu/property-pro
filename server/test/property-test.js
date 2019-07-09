
// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import {
	undefinedOwner,
	undefinedCity,
	undefinedPrice,
	undefinedState,
	undefinedStatus,
	undefinedType,
	undefinedImageUrl,
	undefinedAddress,
} from './demodb/propertyDemoData';

// Configure chai
chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

// Test for GET all properties.
describe('/GET /api/v1/property', () => {
	it('it should get all properties whether sold or available', (done) => {
		chai.request(app)
			.get('/api/v1/property')
			.end((err, res) => {
				res.body.should.be.a('object');
				res.should.have.status(200);
				done();
			});
	});
});

// Test for POST properties
describe('POST /api/v1/property', () => {
	it('it should return 400 status if owner is undefined', (done) => {
		chai.request(app)
			.post('/api/v1/property')
			.send(undefinedOwner)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});


	it('it should return 400 status if status is undefined', (done) => {
		chai.request(app)
			.post('/api/v1/property')
			.send(undefinedStatus)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('it should return 400 status if property price is undefined', (done) => {
		chai.request(app)
			.post('/api/v1/property')
			.send(undefinedPrice)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('it should return 400 status if property state is undefined', (done) => {
		chai.request(app)
			.post('/api/v1/property')
			.send(undefinedState)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('it should return 400 status if property image is undefined', (done) => {
		chai.request(app)
			.post('/api/v1/property')
			.send(undefinedImageUrl)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
	it('it should return 400 status if property type is undefined', (done) => {
		chai.request(app)
			.post('/api/v1/property')
			.send(undefinedType)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('it should return 400 status if property address is not defined', (done) => {
		chai.request(app)
			.post('/api/v1/property')
			.send(undefinedAddress)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
	it('it should return 400 status if property city is undefined', (done) => {
		chai.request(app)
			.post('/api/v1/property')
			.send(undefinedCity)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
});

// Test to get single property
describe('/GET a property by the id', () => {
	it('it should get a specific property by the given id', (done) => {
		const propId = '/api/v1/property/1';
		chai.request(app)
			.get(propId)
			.end((err, res) => {
				res.body.should.be.a('object');
				res.should.have.status(200);
				done();
			});
	});
	it('it should not get any property as ID does not exist', (done) => {
		const id = '/api/v1/property/12';
		chai.request(app)
			.get(id)
			.end((err, res) => {
				res.body.should.be.a('object');
				res.should.have.status(404);
				done();
			});
	});
});

// Test to get specific property type
describe('/GET a property by the property type ', () => {
	it('it should get a specific property by the property type', (done) => {
		const type = 'flat';
		chai.request(app)
			.get(`/api/v1/property/${type}/type`)
			.end((err, res) => {
				res.body.should.be.a('object');
				res.should.have.status(200);
				done();
			});
	});

	it('it should indicate that property type does not exist', (done) => {
		const type = 'high rising';
		chai.request(app)
			.get(`/api/v1/property/${type}/propertyType`)
			.end((err, res) => {
				res.body.should.be.a('object');
				res.should.have.status(404);
				done();
			});
	});
});

//   Test to update property status
describe('/PATCH update property status', () => {
	it('it should update a specific property status', (done) => {
		const updateUrl = '/api/v1/property/1/sold';
		chai.request(app)
			.patch(updateUrl)
			.send({ status: 'sold' })
			.end((err, res) => {
				expect(res).to.have.status(200);
				res.body.should.be.a('object');
				done();
			});
	});

	it('it should not update property status if ID is not found', (done) => {
		const updateUrl = '/api/v1/property/15/sold';
		chai.request(app)
			.patch(updateUrl)
			.send({ status: 'sold' })
			.end((err, res) => {
				expect(res).to.have.status(404);
				res.body.should.be.a('object');
				done();
			});
	});
	it('it should not update property status if key provided is not only status', (done) => {
		const updateUrl = '/api/v1/property/1/sold';
		chai.request(app)
			.patch(updateUrl)
			.send({ status: 'sold', owner: 5 })
			.end((err, res) => {
				expect(res).to.have.status(400);
				res.body.should.be.a('object');
				done();
			});
	});
});


// Test to update property data
describe('/PATCH update property data', () => {
	it('it should update the property data', (done) => {
		const updateDataUrl = '/api/v1/property/1';
		chai.request(app)
			.patch(updateDataUrl)
			.send({
				owner: 2,
				status: 'sold',
				price: 12000,
				state: 'Abia',
				city: 'aba',
				type: 'flat',
				address: '24b umule road',
				created_on: new Date(),
			})
			.end((err, res) => {
				expect(res).to.have.status(201);
				res.body.should.be.a('object');
				done();
			});
	});

	it('it should not update data if wrong property key is inputed ', (done) => {
		const updateDataUrl = '/api/v1/property/1';
		chai.request(app)
			.patch(updateDataUrl)
			.send({
				owner: 2,
				status: 'sold',
				price: 12000,
				state: 'Abia',
				city: 'aba',
				type: 'flat',
				address: '24b umule road',
				image_url: 'https://myimage@.com',
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				res.body.should.be.a('object');
				done();
			});
	});

	it('it should not update data if property id is not found ', (done) => {
		const updateDataUrl = '/api/v1/property/12';
		chai.request(app)
			.patch(updateDataUrl)
			.send({
				owner: 2,
				status: 'sold',
				price: 12000,
				state: 'Abia',
				city: 'aba',
				type: 'flat',
				address: '24b umule road',
				created_on: new Date(),
			})
			.end((err, res) => {
				expect(res).to.have.status(404);
				res.body.should.be.a('object');
				done();
			});
	});
});

// Test to delete property AD
describe('/DELETE a by their id', () => {
	it('it should delete a property advert by their id', (done) => {
		const delDataUrl = '/api/v1/property/3';
		chai.request(app)
			.delete(delDataUrl)
			.end((err, res) => {
				expect(res).to.have.status(202);
				res.body.should.have.a('object');
				done();
			});
	});


	it('it should not delete property if propertyId is not found', (done) => {
		const delDataUrl = '/api/v1/property/31';
		chai.request(app)
			.delete(delDataUrl)
			.end((err, res) => {
				expect(res).to.have.status(404);
				res.body.should.have.a('object');
				done();
			});
	});
});
