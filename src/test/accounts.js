import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../app';

const login = {
  email: 'lanre@gmail.com',
  password: 'lanre1234',
};
const login1 = {
  email: 'toye@gmail.com',
  password: 'toye1234',
};
chai.use(sinonChai);
const { expect } = chai;

chai.use(chaiHttp);
let request;
describe('Test for Account Endpoints', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });
  afterEach(() => sinon.restore());
  after(() => request.close());
  describe('Accounts test', () => {
    it('should return 200 is user can view account', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .get('/api/v1/account/view')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              done();
            });
        });
    });

    it('should return 404 if user account not found', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/json')
        .send(login1)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .get('/api/v1/account/view')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(404);
              expect(res).to.have.status('404');
              done();
            });
        });
    });

    it('should return 409 if wallet number conflicts upon account creation', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .post('/api/v1/account/create')
            .set('Authorization', token)
            .send({
              walletNumber: '0909098',
              walletBalance: '200000'
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(409);
              expect(res).to.have.status('409');
              expect(res.body.message).to.be.equal('It seems this account has been created already...');
              done();
            });
        });
    });

    it('should return 200 for successful transfer', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .post('/api/v1/account/send/6c8f5528-c442-477e-97f0-75c8e0c62f33')
            .set('Authorization', token)
            .send({
              walletBalance: '800',
              category: 'transfer money',
              amount: '100',
              walletNumber: '9098765',
              message: "for tolu's party"
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              done();
            });
        });
    });

    it('should return 400 for missing field when trying to transfer money', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .post('/api/v1/account/send/6c8f5528-c442-477e-97f0-75c8e0c62f33')
            .set('Authorization', token)
            .send({
              walletBalance: '800',
              amount: '100',
              walletNumber: '9098765',
              message: "for tolu's party"
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(400);
              expect(res).to.have.status('400');
              done();
            });
        });
    });

    it('should return 400 for insufficient balance', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .post('/api/v1/account/send/6c8f5528-c442-477e-97f0-75c8e0c62f33')
            .set('Authorization', token)
            .send({
              walletBalance: '800',
              category: 'transfer money',
              amount: '1000',
              walletNumber: '9098765',
              message: "for tolu's party"
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(400);
              expect(res).to.have.status('400');
              done();
            });
        });
    });

    it('should return 400 for unprocessable amount', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .post('/api/v1/account/send/6c8f5528-c442-477e-97f0-75c8e0c62f33')
            .set('Authorization', token)
            .send({
              walletBalance: '800',
              category: 'transfer money',
              amount: '80',
              walletNumber: '9098765',
              message: "for tolu's party"
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(400);
              expect(res).to.have.status('400');
              done();
            });
        });
    });
  });
});
