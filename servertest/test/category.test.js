import app from '../index.js'
import request from 'supertest';
import Category from '../models/Category.js';
import UserCon from '../controllers/Category.js'
import jwt from 'jsonwebtoken';
import beforeAll from 'supertest';

describe('/Category test', () => {
  let token;
  beforeAll(async () => {
    let user = await UserCon.login('admin@mail.ru', 'qwerty');
    token = jwt.sign({email: user.email, password: user.password}, '123456')
  })

  it('Should return all categorys', (done) => {
    const categories = Category.getAll;
    request(app).get('/api/category/getall').set('Authorization', `Bearer ${token}`).expect(categories).end(done);
  });

  it('Should return one category(by id)', (done) => {
    const category = Category.getOne;
    request(app).get('/api/category/getone/4').set('Authorization', `Bearer ${token}`).expect(category).end(done);
  });

  it('Should return created category', (done) => {
    const category = Category.create;
    request(app).post('/api/category/create').set('Authorization', `Bearer ${token}`).send({name: 'test'}).expect(category).end(done);
  });

  it('Should return updated category', (done) => {
    const category = Category.update;
    request(app).put('/api/category/update/5').set('Authorization', `Bearer ${token}`).send({email: "Alina huylusha"}).expect(category).end(done);
  });

  it('Should return deleted category', (done) => {
    const category = Category.delete;
    request(app).delete('/api/category/delete/5').set('Authorization', `Bearer ${token}`).expect(category).end(done);
  });
});