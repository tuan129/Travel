const express = require('express');
const bookingController = require('../controllers/bookFlightController');

const router = express.Router();

router.route('/:id').get(bookingController.getAllBookings);
router.route('/').post(bookingController.createBooking);

module.exports = router;
