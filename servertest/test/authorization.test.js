import app from '../index.js'
import request from 'supertest';
import UserCon from '../controllers/User.js'
import jwt from 'jsonwebtoken';
import beforeAll from 'supertest';

describe('/Authorization test', () => {
  let token;
  beforeAll(async () => {
    let user = await UserCon.login('admin@mail.ru', 'qwerty');
    token = jwt.sign({email: user.email, password: user.password}, '123456')
  })

  it('Should return token', (done) => {
    const token = UserCon.login ;
    request(app).post('/api/user/login').send({email: 'admin@mail.ru', password: 'qwerty'}).expect(token).end(done);
  });
})