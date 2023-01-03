import app from '../index.js'
import request from 'supertest';
import Brand from '../models/Brand.js';
import UserCon from '../controllers/Brand.js'
import jwt from 'jsonwebtoken';
import beforeAll from 'supertest';

describe('/Brand test', () => {
  let token;
  beforeAll(async () => {
    let user = await UserCon.login('admin@mail.ru', 'qwerty');
    token = jwt.sign({email: user.email, password: user.password}, '123456')
  })

  it('Should return all brands', (done) => {
    const brands = Brand.getAll;
    request(app).get('/api/brand/getall').set('Authorization', `Bearer ${token}`).expect(brands).end(done);
  });

  it('Should return one brand(by id)', (done) => {
    const brand = Brand.getOne;
    request(app).get('/api/brand/getone/4').set('Authorization', `Bearer ${token}`).expect(brand).end(done);
  });

  it('Should return created brand', (done) => {
    const brand = Brand.create;
    request(app).post('/api/brand/create').set('Authorization', `Bearer ${token}`).send({name: 'test'}).expect(brand).end(done);
  });

  it('Should return updated brand', (done) => {
    const brand = Brand.update;
    request(app).put('/api/brand/update/5').set('Authorization', `Bearer ${token}`).send({email: "Alina huylusha"}).expect(brand).end(done);
  });

  it('Should return deleted brand', (done) => {
    const brand = Brand.delete;
    request(app).delete('/api/brand/delete/5').set('Authorization', `Bearer ${token}`).expect(brand).end(done);
  });
});