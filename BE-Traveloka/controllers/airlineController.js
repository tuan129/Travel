const Airline = require('../models/airlinesModel');

const searchAirline = async (req, res) => {
  try {
    const { keyword } = req.query;
    const airlines = await Airline.find({
      nameAirline: { $regex: keyword, $options: 'i' },
    });

    res.status(200).json({
      status: 'success',
      results: airlines.length,
      data: {
        airlines,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Airline not found',
    });
  }
};

const getAllAirlines = async (req, res) => {
  try {
    const airlines = await Airline.find(req.query);

    res.status(200).json({
      status: 'success',
      results: airlines.length,
      data: {
        airlines,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Airline not found',
    });
  }
};

const createAirline = async (req, res) => {
  try {
    const newAirline = await Airline.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        airline: newAirline,
      },
    });
  } catch (err) {
    res.status(400).json({
      starus: 'fail',
      message: err.message,
    });
  }
};

const updateAirline = async (req, res) => {
  try {
    const airline = await Airline.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        airline,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const deleteAirline = async (req, res) => {
  try {
    await Airline.findByIdAndDelete(req.params.id);
    res.status(200).json({
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
  searchAirline,
  getAllAirlines,
  createAirline,
  updateAirline,
  deleteAirline,
};