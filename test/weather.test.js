require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Location = require('../lib/models/Location');
const Temperature = require('../lib/models/Temperature');

describe('weather routes', () => {

  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let location = null;
  let location1 = null;

  beforeEach(async() => {
    location = await Location.create({ name: 'Mars' });
    location1 = await Location.create({ name: 'Pluto' });
    await Temperature.create({ temperature: 54, location: location._id });
    await Temperature.create({ temperature: 32, location: location._id });
    await Temperature.create({ temperature: 31, location: location._id });
    await Temperature.create({ temperature: 37, location: location._id });
    await Temperature.create({ temperature: 33, location: location._id });
    await Temperature.create({ temperature: 33, location: location1._id });
    await Temperature.create({ temperature: 32, location: location1._id });
  });

  it('can get all temperatures for a locaiton by ID using /temperatures/id', () => {
    return request(app)
      .get(`/weather/temperatures/${location._id}`)
      .then(res => {
        expect(res.body[0].temperatures).toHaveLength(5);
      });
  });

  it('can get all temperatures and locations using /temperatures/all', () => {
    return request(app)
      .get('/weather/temperatures/all')
      .then(res => {
        expect(res.body).toHaveLength(2);
        expect(res.body[0].temperatures).toHaveLength(5);
        expect(res.body[1].temperatures).toHaveLength(2);
      });
  });
});
