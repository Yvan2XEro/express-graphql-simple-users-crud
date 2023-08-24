const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('./server');


// Les tests unitaires
describe('GraphQL API Demo users Tests', () => {

  // Tester que la reuete de recuperation des users fonctionne
  it('should get list of users', (done) => {
    request(app)
      .post('/graphql')
      .send({ query: '{ users { id first_name last_name } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.users).to.be.an('array');
        done();
      });
  });
});
