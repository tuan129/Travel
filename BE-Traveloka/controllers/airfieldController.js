const Airfield = require('../models/airfieldModel');

const searchAirfield = async (req, res) => {
  try {
    const { keyword } = req.query;

    const airfields = await Airfield.find({
      $or: [
        { codeAirfield: { $regex: keyword, $options: 'i' } },
        { nameAirfield: { $regex: keyword, $options: 'i' } },
        { city: { $regex: keyword, $options: 'i' } },
        { country: { $regex: keyword, $options: 'i' } },
      ],
    });

    if (airfields.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No airfields found matching your search',
      });
    }

    res.status(200).json({
      status: 'success',
      results: airfields.length,
      data: {
        airfields,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Airfield not found',
    });
  }
};

const getAllAirfields = async (req, res) => {
  try {
    const airfields = await Airfield.find(req.query);
    res.status(200).json({
      status: 'success',
      results: airfields.length,
      data: {
        airfields,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Airfield not found',
    });
  }
};

const createAirfield = async (req, res) => {
  try {
    const newAirfield = await Airfield.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        airfield: newAirfield,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const updateAirfield = async (req, res) => {
  try {
    const airfield = await Airfield.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        airfield,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const deleteAirfield = async (req, res) => {
  try {
    await Airfield.findByIdAndDelete(req.params.id);
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
  createAirfield,
  searchAirfield,
  updateAirfield,
  deleteAirfield,
  getAllAirfields,
};
