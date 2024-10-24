const Flight = require('../models/flightModel');
const Airfield = require('../models/airfieldModel');

const seatClassMapping = {
  'Phổ thông': 'phoThong',
  'Phổ thông đặt biệt': 'phoThongDacBiet',
  'Thương gia': 'thuongGia',
  'Hạng nhất': 'hangNhat',
};

const getAllFlights = async (req, res) => {
  try {
    const queryObj = { ...req.query };

    console.log(queryObj.from);

    const mappedSeatClass = seatClassMapping[queryObj.seatClass];

    const fromAirfield = await Airfield.findOne({
      city: { $regex: new RegExp(`^${queryObj.from}$`, 'i') },
    });

    const toAirfield = await Airfield.findOne({
      city: { $regex: new RegExp(`^${queryObj.to}$`, 'i') },
    });
    const departureQuery = {
      'airfield.from': fromAirfield,
      'airfield.to': toAirfield,
      date: {
        $elemMatch: {
          $eq: new Date(queryObj.departureDate),
        },
      },
      [`tickets.${mappedSeatClass}.soLuongVe`]: { $gt: queryObj.totalCustomer },
    };

    if (queryObj.returnDate) {
      const returnQuery = {
        'airfield.from': queryObj.to,
        'airfield.to': queryObj.from,
        date: {
          $elemMatch: {
            $eq: new Date(queryObj.returnDate),
          },
        },
        [`tickets.${mappedSeatClass}.soLuongVe`]: {
          $gt: queryObj.totalCustomer,
        },
      };

      const returnFlights = await Flight.find(returnQuery);
      const flights = await Flight.find(departureQuery)
        .populate('airfield.from', 'city')
        .populate('airfield.to', 'city');

      res.status(200).json({
        status: 'success',
        results: {
          departureFlights: flights.length,
          returnFlights: returnFlights.length,
          data: {
            departure: flights,
            return: returnFlights,
          },
        },
      });
    } else {
      const flights = await Flight.find(departureQuery)
        .populate('airfield.from', 'city codeAirfield nameAirfield')
        .populate('airfield.to', 'city codeAirfield nameAirfield');
      res.status(200).json({
        status: 'success',
        results: flights.length,

        data: {
          flights,
        },
      });
    }
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
