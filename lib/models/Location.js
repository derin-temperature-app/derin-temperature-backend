const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

locationSchema.statics.getTemperaturesByLocation = function(id) {
  const objectId = mongoose.Types.ObjectId(id);
  return this
    .aggregate([
      {
        '$match': {
          '_id': objectId
        }
      }, {
        '$lookup': {
          'from': 'temperatures',
          'localField': '_id',
          'foreignField': 'location',
          'as': 'temperatures'
        }
      }
    ]);
};

locationSchema.statics.getAllTemperaturesAndLocations = function() {
  return this
    .aggregate([
      {
        '$lookup': {
          'from': 'temperatures',
          'localField': '_id',
          'foreignField': 'location',
          'as': 'temperatures'
        }
      }
    ]);
};

module.exports = mongoose.model('Location', locationSchema);
