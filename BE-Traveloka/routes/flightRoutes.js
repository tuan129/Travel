const express = require('express');
const flightController = require('../controllers/flightController');

const router = express.Router();

router
  .route('/')
  .get(flightController.getAllFlights)
  .post(flightController.createFlight);

router
  .route('/:id')
  .get(flightController.getFlight)
  .delete(flightController.deleteFlight)
  .patch(flightController.updateFlight);

module.exports = router;
