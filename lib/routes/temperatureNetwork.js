const { Router } = require('express');
const Location = require('../models/Location');
const Temperature = require('../models/Temperature');

module.exports = Router()
  .get('/status', (req, res) => {
    res.sendStatus(204);
  })

  .post('/register', (req, res, next) => {
    const { name } = req.body;
    res.status(200);
    Location
      .create({ name })
      .then(location => res.send({ id: location._id }))
      .catch(next);
  })

  .delete('/deregister', (req, res, next) => {
    const { id } = req.body;
    res.sendStatus(204);
    Location
      .findByIdAndDelete(id)
      .catch(next);
  })

  .post('/temp/:id', (req, res, next) => {
    const id = req.params.id;
    const { temperature } = req.body;
    Temperature
      .create({ temperature, location: id })
      .then(created => res.send(created))
      .catch(next);
  });
