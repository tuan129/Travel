const Booking = require('../models/bookingModel');

// Strategy Pattern
class BookingStrategy {
  async execute(req, res) {}
}

class GetAllBookingStrategy extends BookingStrategy {
  async execute(req, res) {
    try {
      const booking = await Booking.find(req.params)
        .populate('user', 'fullname email')
        .populate('flight');
      // console.log(bookings);

      res.status(200).json({
        status: 'success',
        results: booking.length,
        data: { booking },
      });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    }
  }
}

class GetBookingsStrategy extends BookingStrategy {
  async execute(req, res) {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.status(401).json({
          status: 'fail',
          message: 'Bạn phải đăng nhập để xem thông tin booking',
        });
      }

      const queryObj = { ...req.query, user: userId };
      const excludeFields = ['page', 'sort', 'limit', 'fields'];
      excludeFields.forEach((el) => delete queryObj[el]);

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`,
      );
      const query = Booking.find(JSON.parse(queryStr))
        .populate('user')
        .populate({
          path: 'flight',
          populate: [
            { path: 'airfield.from', model: 'Airfield' },
            { path: 'airfield.to', model: 'Airfield' },
          ],
        });
      const bookings = await query;
      res.status(200).json({
        status: 'success',
        results: bookings.length,
        data: { bookings },
      });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    }
  }
}

class CreateBookingStrategy extends BookingStrategy {
  async execute(req, res) {
    try {
      const newBooking = await Booking.create(req.body);
      res
        .status(200)
        .json({ status: 'success', data: { booking: newBooking } }); 
    } catch (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    }
  }
}

// Controller
module.exports = {
  createBooking: (req, res) => new CreateBookingStrategy().execute(req, res),
  getBookings: (req, res) => new GetBookingsStrategy().execute(req, res),
  getAllBooking: (req, res) => new GetAllBookingStrategy().execute(req, res),
};
