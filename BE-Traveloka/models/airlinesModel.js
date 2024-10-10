const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
  nameAirline: {
    type: String,
    required: true,
  },
});

const Airline = mongoose.model('Airline', airlineSchema);
module.exports = Airline;
