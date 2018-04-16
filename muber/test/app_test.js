const app = require('../app');
const assert = require('assert');
const request = require('supertest');

describe('Express app', () => {
  it('handles a GET request to /api', (done) => {
    request(app)
      .get('/api')
      .end((err, response) => {
        // console.log(response);
        assert(response.body.hi === 'Brad!');
        done();
      });
  });
});
