import app from '../index.js'
import request from 'supertest';
import Product from '../models/Product.js';
import UserCon from '../controllers/User.js'
import jwt from 'jsonwebtoken';
import beforeAll from 'supertest';

describe('/Product test', () => {
  let token;
  beforeAll(async () => {
    let user = await UserCon.login('admin@mail.ru', 'qwerty');
    token = jwt.sign({email: user.email, password: user.password}, '123456')
  })

  it('Should return all products', (done) => {
    const products = Product.getAll;
    request(app).get('/api/products/getall').expect(products).end(done);
  });

  it('Should return one product', (done) => {
    const product = Product.getOne;
    request(app).get('/api/product/getone/3').expect(product).end(done);
  });

  it('Should return created product', (done) => {
    const product = Product.create;
    request(app).post('/api/product/create').set('Authorization', `Bearer ${token}`).send({name: 'test', price: 100, rating: 5}).expect(product).end(done);
  });

  it('Should return updated product', (done) => {
    const product = Product.update;
    request(app).put('/api/product/update/4').set('Authorization', `Bearer ${token}`).send({name: 'test'}).expect(product).end(done);
  });

  it('Should return deleted product', (done) => {
    const product = Product.delete;
    request(app).delete('/api/product/delete/4').set('Authorization', `Bearer ${token}`).expect(product).end(done);
  });
});