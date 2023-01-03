import app from '../index.js'
import request from 'supertest';
import Basket from '../models/Basket.js';
import UserCon from '../controllers/Brand.js'
import jwt from 'jsonwebtoken';
import beforeAll from 'supertest';

describe('/Basket test', () => {
  let token;
  beforeAll(async () => {
    let user = await UserCon.login('admin@mail.ru', 'qwerty');
    token = jwt.sign({email: user.email, password: user.password}, '123456')
  })

  it('Should return one basket', (done) => {
    const basket = Basket.getOne ;
    request(app).get('/api/basket/getone').set('Authorization', `Bearer ${token}`).send({id: 1}).expect(basket).end(done);
  });
})