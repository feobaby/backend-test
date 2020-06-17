import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../app';

const login = {
  email: 'lanre@gmail.com',
  password: 'lanre1234',
};
chai.use(sinonChai);
const { expect } = chai;

chai.use(chaiHttp);
let request;
describe('Test for Bills Endpoints', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });
  afterEach(() => sinon.restore());
  after(() => request.close());
  describe('Bills test', () => {
    it('should return 200 if airtime payment is successful', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .post('/api/v1/bill/airtime/6c8f5528-c442-477e-97f0-75c8e0c62f33')
            .set('Authorization', token)
            .send({
              walletBalance: '1000',
              category: 'pay airtime',
              amount: '100',
              airtime: 'Mtn'
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              done();
            });
        });
    });
    it('should return 200 if electricity payment is successful', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .post('/api/v1/bill/electricity/6c8f5528-c442-477e-97f0-75c8e0c62f33')
            .set('Authorization', token)
            .send({
              walletBalance: '1000',
              category: 'pay for electricity',
              amount: '100',
              electricity: 'Abuja Electricity',
              meterNo: '7878787878'
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              done();
            });
        });
    });

    it('should return 400 field is missing foe elec. payment', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .post('/api/v1/bill/airtime/6c8f5528-c442-477e-97f0-75c8e0c62f33')
            .set('Authorization', token)
            .send({
              category: 'pay for electricity',
              amount: '100',
              electricity: 'Abuja Electricity',
              meterNo: '7878787878'
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(400);
              expect(res).to.have.status('400');
              done();
            });
        });
    });

    it('should return 400 field is missing foe elec. payment', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .post('/api/v1/bill/electricity/6c8f5528-c442-477e-97f0-75c8e0c62f33')
            .set('Authorization', token)
            .send({
              category: 'pay for electricity',
              amount: '100',
              electricity: 'Abuja Electricity',
              meterNo: '7878787878'
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
