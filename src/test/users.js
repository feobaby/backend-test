import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('Users test', () => {
  it('it should return 201 if the user successfully signs up', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        fullname: 'sharon dele',
        email: faker.internet.email(),
        password: 'dele562',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res).to.have.status('201');
        expect(res.body.message).to.be.equal('Welcome to Mkobo Wallet!');
        expect(res.body).to.include.key('data');
        expect(res.body).to.include.key('token');
        done();
      });
  });

  it('it should return 400 if a field is miising when trying to sign up', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: faker.internet.email(),
        password: 'dele562',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        done();
      });
  });

  it('it should return 200 if the user successfully signs in', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'lanre@gmail.com',
        password: 'lanre1234',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('user');
        expect(res.body.user).to.include.key('id');
        expect(res.body.user).to.include.key('fullname');
        expect(res.body.user).to.include.key('email');
        expect(res.body.user).to.include.key('password');
        expect(res.body).to.include.key('token');
        done();
      });
  });

  it('it should return 400 if a field is missing', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send({
        password: 'dele562',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        done();
      });
  });

  it('it should return 409 if there is an email conflict', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        fullname: 'sharon dele',
        email: 'lanre@gmail.com',
        password: 'dele562',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        done();
      });
  });

  it('it should return 400 if email is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        fullname: 'sharon dele',
        email: 'lanre@gmailcom',
        password: 'dele562',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        done();
      });
  });

  it('it should return 400 if full name is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        fullname: 'sharon 77dele',
        email: 'lanre@gmail.com',
        password: 'dele562',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        done();
      });
  });

  it('it should return 400 if a field is missing', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'lanre@gmailcom',
        password: 'dele562',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        done();
      });
  });

  it('it should return 404 if route is not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signupp')
      .send({
        fullname: 'sharon dele',
        email: faker.internet.email(),
        password: 'dele562',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        done();
      });
  });
});
