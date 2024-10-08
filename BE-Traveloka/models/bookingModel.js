const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    required: true,
  },
});

// Sử dụng function thông thường
bookingSchema.pre('save', (next) => {
  this.totalPrice = this.ticketPrice * this.totalTickets;
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
