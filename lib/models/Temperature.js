const mongoose = require('mongoose');

const temperatureSchema = mongoose.Schema({
  temperature: {
    type: Number,
    required: true
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Temperature', temperatureSchema);
