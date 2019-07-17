/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import pool from '../db/index';

chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

pool.query('SELECT MAX(id) from property', (err, result) => {
const id = result.rows[0].max + 1;


const validPropertyAd = {
	status: 'Available',
	price: '7000.8999',
	state: 'Imo',
	type: 'flat',
	city: 'owerri',
  address: '76768uuhygygyb',
  image_url: 'hdhdhhdhdhd',
  };

  
const User = {
	first_name: 'Mark',
	last_name: 'Lisaswa',
	email: 'uchr@gmail.com',
	address: '0980989',
	password: 'mickey'
};

describe('Property advert test', () => {

    let token;

    before((done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(User)
            .end(( err, res ) => {
                token = res.body.data.token;
                done();
            });
   
    });
      
    it('Should add valid property to the database', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('token', token)
        .send(validPropertyAd)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body).to.have.a.property('data');
          const result = res.body.data;
					expect(result).to.have.a.property('id');
					expect(result.id).to.be.a('number');
					expect(result).to.have.a.property('price');
					expect(result.price).to.be.a('number');
					expect(result).to.have.a.property('status');
					expect(result.status).to.be.a('string');
					expect(result).to.have.a.property('state');
					expect(result.state).to.be.a('string');
					expect(result).to.have.a.property('city');
					expect(result.city).to.be.a('string');
					expect(result).to.have.a.property('address');
					expect(result.address).to.be.a('string');
					expect(result).to.have.a.property('created_on');
					expect(result.created_on).to.be.a('string');
					expect(result).to.have.a.property('image_url');
					expect(result.image_url).to.be.a('string');
          done();
        });
    });

    it('should return error when invalid property details are posted', (done) => {
			chai.request(app)
				.post('/api/v1/property')
				.set('token', token)
				.send({ address: 'lets add just this address' })
				.end((err, res) => {
					expect(res.status).equal(400);
					done();
				});
		});

    // Test for get property
	it('Should Get all the properties', (done) => {
	  chai.request(app)
      .get('/api/v1/property')
      .set('token', token)
			.end((err, res) => {
      res.should.have.status(200);
      expect(res.body.status).to.equal('success');
					expect(res.body.data).to.be.an('array');
					expect(res.body).to.have.a.property('data');
					const result = res.body.data[0];
					expect(result).to.have.a.property('id');
					expect(result.id).to.be.a('number');
					expect(result).to.have.a.property('price');
					expect(result.price).to.be.a('number');
					expect(result).to.have.a.property('status');
					expect(result.status).to.be.a('string');
					expect(result).to.have.a.property('state');
					expect(result.state).to.be.a('string');
					expect(result).to.have.a.property('city');
					expect(result.city).to.be.a('string');
					expect(result).to.have.a.property('address');
					expect(result.address).to.be.a('string');
					expect(result).to.have.a.property('created_on');
					expect(result.created_on).to.be.a('string');
					expect(result).to.have.a.property('image_url');					
		  done();
			});
	});

	it('Should no Get a null property', (done) => {
		chai.request(app)
      .get('/api/v1/property/51')
      .set('token', token)
		  .end((err, res) => {
				res.should.have.status(404);
				done();
		  });
	  });	

	  // it('Should not fetch a null property type', (done) => {
		// chai.request(app)
    //   .get('/api/v1/property/flays/type')
    //   .set('token', token)
		//   .end((err, res) => {
		// 		res.should.have.status(404);
		// 		done();
		//   });
    // }); 
  
      it('Should not mark prroperty advert as sold when supplied inexistent property id', (done) => {
        chai.request(app)
          .patch('/api/v1/property/4/sold')
          .set('token', token)
          .send({status: 'sold'})
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
        });	

  // it('Should mark prroperty advert as sold', (done) => {
    
  //         chai.request(app)
  //           .patch(`/api/v1/property/${id}/sold`)
  //           .set('token', token)
  //           .end((err, res) => {
  //             res.should.have.status(200);
  //             done();
  //           });
  //         });	
  it('Should update property fields', (done) => {
    chai.request(app)
      .patch(`/api/v1/property/${id}`)
      .set('token', token)
      .send({status: 'sold',
             state: 'Oyo'
    })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an('object');
						expect(res.body).to.have.a.property('data');
						const result = res.body.data;
						expect(result).to.have.a.property('id');
						expect(result.id).to.be.a('number');
						expect(result).to.have.a.property('price');
						expect(result.price).to.be.a('number');
						expect(result).to.have.a.property('status');
						expect(result.status).to.be.a('string');
						expect(result.status).to.equal('sold');
						expect(result).to.have.a.property('state');
						expect(result.state).to.be.a('string');
						expect(result.state).to.equal('Oyo');
						expect(result).to.have.a.property('city');
						expect(result.city).to.be.a('string');
						expect(result).to.have.a.property('address');
						expect(result.address).to.be.a('string');
						expect(result).to.have.a.property('created_on');
						expect(result.created_on).to.be.a('string');
						expect(result).to.have.a.property('image_url');
						expect(result.image_url).to.be.a('string');
        done();
      });
  });	

  
  it('Should be able to delete property advert', (done) => {
    chai.request(app)
      .delete(`/api/v1/property/${id}`)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });	

    it('Should not be able to delete property advert', (done) => {
      chai.request(app)
        .delete('/api/v1/property/201')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
      });
   });	
});