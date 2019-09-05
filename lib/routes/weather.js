const { Router } = require('express');
const Location = require('../models/Location');

module.exports = Router()
  .get('/temperatures/all', (req, res, next) => {
    Location
      .getAllTemperaturesAndLocations()
      .then(all => res.send(all))
      .catch(next);
  })

  .get('/temperatures/:id', (req, res, next) => {
    Location
      .getTemperaturesByLocation(req.params.id)
      .then(temps => res.send(temps))
      .catch(next);
  });
