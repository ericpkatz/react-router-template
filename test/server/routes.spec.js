const expect = require('chai').expect;
const app = require('supertest')(require('../../app'));
const db = require('../../db');

describe('routes', ()=> {
  beforeEach((done)=> {
    db.seed()
      .then(()=> done());
  });
  describe('/', ()=> {
    it('is ok', ()=> {
      return app.get('/')
        .expect(200)
    });
  });
  describe('/api/products', ()=> {
    it('returns 2 products', ()=> {
      return app.get('/api/products')
        .expect(200)
        .then((result)=> {
          expect(result.body.length).to.equal(3)
        });
    });
  });
});
