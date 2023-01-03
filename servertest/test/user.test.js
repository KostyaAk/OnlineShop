import app from '../index.js'
import request from 'supertest';
import User from '../models/User.js';
import UserCon from '../controllers/User.js'
import jwt from 'jsonwebtoken';
import beforeAll from 'supertest';

describe('/Users test', () => {
  let token;
  beforeAll(async () => {
    let user = await UserCon.login('admin@mail.ru', 'qwerty');
    token = jwt.sign({email: user.email, password: user.password}, '123456')
  })

  it('Should return all users', (done) => {
    const user = User.getAll;
    request(app).get('/api/user/getall').set('Authorization', `Bearer ${token}`).expect(user).end(done);
  });

  it('Should return one user(by id)', (done) => {
    const user = User.getOne;
    request(app).get('/api/user/getone/4').set('Authorization', `Bearer ${token}`).expect(user).end(done);
  });

  it('Should return created user', (done) => {
    const user = User.create;
    request(app).post('/api/user/create').set('Authorization', `Bearer ${token}`).send({email: 'test', password: 'qwerty'}).expect(user).end(done);
  });

  it('Should return updated user', (done) => {
    const user = User.update;
    request(app).put('/api/user/update/5').set('Authorization', `Bearer ${token}`).send({email: "Alina huylusha"}).expect(user).end(done);
  });

  it('Should return deleted user', (done) => {
    const user = User.delete;
    request(app).delete('/api/user/delete/4').set('Authorization', `Bearer ${token}`).expect(user).end(done);
  });
});

