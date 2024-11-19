const express = require('express');
const airlineController = require('../controllers/airlineController');

const router = express.Router();

router
  .route('/')
  .get(airlineController.getAllAirlines)
  .post(airlineController.createAirline);

router.route('/search').get(airlineController.searchAirline);

router
  .route('/:id')
  .patch(airlineController.updateAirline)
  .delete(airlineController.deleteAirline);

module.exports = router;
