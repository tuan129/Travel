const mongoose = require('mongoose');

//Hãng hàng không
const airlineSchema = new mongoose.Schema({
  nameAirline: {
    type: String,
    required: true,
    unique: true,
  },
});

const Airline = mongoose.model('Airline', airlineSchema);
module.exports = Airline;
