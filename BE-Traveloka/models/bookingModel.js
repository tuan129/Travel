const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
  class: {
    type: String,
    enum: ['phoThong', 'phoThongDacBiet', 'thuongGia', 'hangNhat'],
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  seatNumber: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  totalTickets: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
});
bookingSchema.pre('save', function (next) {
  if (!this.totalPrice) {
    this.totalPrice = this.ticketPrice * this.totalTickets;
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
