require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Location = require('../lib/models/Location');
const Temperature = require('../lib/models/Temperature');

describe('temperatureNetwork routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let location = null;

  beforeEach(async() => {
    location = await Location.create({
      name: 'Mars'
    });
    await Temperature.create({ temperature: 38, location: location._id });
  });

  it('returns status code of 200 on request to /status', () => {
    const expected = 204;
    return request(app)
      .get('/status')
      .then(res => {
        expect(res.status).toEqual(expected);
      });
  });

  it('can register location, and send back ID on request to /register', () => {
    return request(app)
      .post('/register')
      .send({ name: 'Mars' })
      .then(res => {
        expect(res.body.id).toEqual(expect.any(String));
        expect(res.status).toEqual(200);
      });
  });

  it('will send a request to server and send status code of 204 upon deleting ID', () => {
    return request(app)
      .delete('/deregister')
      .send({ id: location._id })
      .then(res => {
        expect(res.status).toEqual(204);
      });
  });

  it('records new temps on post request to /temp', () => {
    return request(app)
      .post(`/temp/${location._id}`)
      .send({ temperature: 40 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          temperature: 40,
          location: location._id.toString(),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        });
      });
  });
});
