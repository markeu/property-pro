/* eslint-disable no-undef */
// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import properties from '../models/property';

import {
  validAd,
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
describe('/GET /api/v1/properties', () => {
  it('it should get all properties whether sold or available', (done) => {
    chai.request(app)
      .get('/api/v1/properties')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(200);
        done();
      });
  });
});

// Test for POST properties
describe('POST /api/v1/properties', () => {
  // it('it should not create a property ad if the user is not authenticated', (done) => {
  //   chai.request(app)
  //     .post('/api/v1/properties')
  //     .send(validAd)
  //     .end((err, res) => {
  //       expect(res).to.have.status(201);
  //       res.body.should.be.a('object');
  //       done();
  //     });
  // });

  it('it should return 400 status if owner is undefined', (done) => {
    chai.request(app)
      .post('/api/v1/properties')
      .send(undefinedOwner)
      .end((err, res) => {
        expect(res).to.have.status(400);
        // res.body.should.have.property({status, data});
        // console.log(res.body, '===============')
        done();
      });
  });


  it('it should return 400 status if status is undefined', (done) => {
    chai.request(app)
      .post('/api/v1/properties')
      .send(undefinedStatus)
      .end((err, res) => {
        expect(res).to.have.status(400);
        // res.body.should.have.property({status, data});
        // console.log(res.body, '===============')
        done();
      });
  });

  it('it should return 400 status if property price is undefined', (done) => {
    chai.request(app)
      .post('/api/v1/properties')
      .send(undefinedPrice)
      .end((err, res) => {
        expect(res).to.have.status(400);
        // res.body.should.have.property('message');
        done();
      });
  });

  it('it should return 400 status if property state is undefined', (done) => {
    chai.request(app)
      .post('/api/v1/properties')
      .send(undefinedState)
      .end((err, res) => {
        expect(res).to.have.status(400);
        // res.body.should.have.property('message');
        done();
      });
  });

  it('it should return 400 status if property image is undefined', (done) => {
    chai.request(app)
      .post('/api/v1/properties')
      .send(undefinedImageUrl)
      .end((err, res) => {
        expect(res).to.have.status(400);
        // res.body.should.have.property('message');
        done();
      });
  });
  it('it should return 400 status if property type is undefined', (done) => {
    chai.request(app)
      .post('/api/v1/properties')
      .send(undefinedType)
      .end((err, res) => {
        expect(res).to.have.status(400);
        // res.body.should.have.property('message');
        done();
      });
  });

  it('it should return 400 status if property address is not defined', (done) => {
    chai.request(app)
      .post('/api/v1/properties')
      .send(undefinedAddress)
      .end((err, res) => {
        expect(res).to.have.status(400);
        // res.body.should.have.property('message');
        done();
      });
  });
  it('it should return 400 status if property city is undefined', (done) => {
    chai.request(app)
      .post('/api/v1/properties')
      .send(undefinedCity)
      .end((err, res) => {
        expect(res).to.have.status(400);
        // res.body.should.have.property('message');
        done();
      });
  });
});

// Test to get single property
describe('/GET a property by the id', () => {
  it('it should get a specific property by the given id', (done) => {
    const id = '/api/v1/properties/1';
    chai.request(app)
      .get(id)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(200);
        done();
      });
  });
  it('it should not get any property as ID does not exist', (done) => {
    const id = '/api/v1/properties/12';
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
      .get(`/api/v1/properties/${type}/type`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(200);
        done();
      });
  });

  it('it should not pecific property as property type does not exist', (done) => {
    const type = 'high rising';
    chai.request(app)
      .get(`/api/v1/properties/${type}/type`)
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
    const updateUrl = '/api/v1/properties/1/status';
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
    const updateUrl = '/api/v1/properties/15/status';
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
    const updateUrl = '/api/v1/properties/1/status';
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
    const updateDataUrl = '/api/v1/properties/1';
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
    const updateDataUrl = '/api/v1/properties/1';
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
    const updateDataUrl = '/api/v1/properties/12';
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
    const delDataUrl = '/api/v1/properties/3';
    chai.request(app)
      .delete(delDataUrl)
      .end((err, res) => {
        expect(res).to.have.status(202);
        res.body.should.have.a('object');
        done();
      });
  });


  it('it should not delete property if propertyId is not found', (done) => {
    const delDataUrl = '/api/v1/properties/31';
    chai.request(app)
      .delete(delDataUrl)
      .end((err, res) => {
        expect(res).to.have.status(404);
        res.body.should.have.a('object');
        done();
      });
  });
});
