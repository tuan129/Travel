const Booking = require('../models/bookingModel');

const getAllBookings = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;

    if (!userId) {
      return res.status(401).json({
        status: 'fail',
        message: 'Bạn phải đăng nhập để xem thông tin booking',
      });
    }

    const queryObj = { ...req.query, user: userId };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => {
      delete queryObj[el];
    });

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const query = Booking.find(JSON.parse(queryStr)).populate('user flight');

    const Bookings = await query;

    res.status(200).json({
      status: 'success',
      results: Bookings.length,
      data: {
        Bookings,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
const createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        booking: newBooking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = { createBooking, getAllBookings };
