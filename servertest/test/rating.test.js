import app from '../index.js'
import request from 'supertest';
import Rating from '../models/Brand.js';
import UserCon from '../controllers/Brand.js'
import jwt from 'jsonwebtoken';
import beforeAll from 'supertest';

describe('/Rating test', () => {
  let token;
  let user;
  beforeAll(async () => {
    user = await UserCon.login('admin@mail.ru', 'qwerty');
    token = jwt.sign({email: user.email, password: user.password}, '123456')
  })

  it('Should return one rating', (done) => {
    const rating = Rating.getOne;
    request(app).get('/api/rating/product/2/2').set('Authorization', `Bearer ${token}`).expect(rating).end(done);
  });

  it('Should return created rating', (done) => {
    const rating = Rating.create;
    request(app).post('/api/rating/product/3)/rate/:2').set('Authorization', `Bearer ${token}`).send({userId: 2, productId: 3, rate: 2}).expect(rating).end(done);
  });
 
});