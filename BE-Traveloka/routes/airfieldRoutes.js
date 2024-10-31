const express = require('express');
const airfieldController = require('../controllers/airfieldController');

const router = express.Router();

router
  .route('/')
  .get(airfieldController.getAllAirfields)
  .post(airfieldController.createAirfield);

router.route('/search').get(airfieldController.searchAirfield);

router
  .route('/:id')
  .patch(airfieldController.updateAirfield)
  .delete(airfieldController.deleteAirfield);

module.exports = router;