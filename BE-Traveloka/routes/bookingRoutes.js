const express = require('express');
const bookingController = require('../controllers/bookFlightController');

const router = express.Router();

router
  .route('/')
  .post(bookingController.createBooking)
  .get(bookingController.getAllBooking);
router.route('/:id').get(bookingController.getBookings);

module.exports = router;