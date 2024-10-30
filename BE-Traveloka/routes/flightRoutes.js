const express = require('express');
const flightController = require('../controllers/flightController');

const router = express.Router();

router
  .route('/')
  .get(flightController.getAllFlights)
  .post(flightController.createFlight);

router.route('/dashboard').get(flightController.getFlight);

router
  .route('/:id')
  .delete(flightController.deleteFlight)
  .patch(flightController.updateFlight);

module.exports = router;
