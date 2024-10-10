const Flight = require('../models/flightModel');

const getAllFlights = async (req, res) => {
  try {
    // Build Query
    // 1A. Filterings
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => {
      delete queryObj[el];
    });

    // 1B. Advanced Filterings
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const query = Flight.find(JSON.parse(queryStr));
    //gte, gt, lte, lt

    const Flights = await query;
    res.status(200).json({
      status: 'success',
      results: Flights.length,
      data: {
        Flights,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        flight,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const createFlight = async (req, res) => {
  try {
    const newFlight = await Flight.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        Flight: newFlight,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        flight,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const deleteFlight = async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = {
  getAllFlights,
  getFlight,
  createFlight,
  updateFlight,
  deleteFlight,
};
