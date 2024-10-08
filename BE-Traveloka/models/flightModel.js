const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightCode: {
    type: String,
    required: [true, 'mã chuyến bay phải có giá trị'],
  },
  airlines: {
    type: String,
    required: [true, 'hãng hàng không phải có giá trị'],
  },
  airfield: {
    from: {
      type: String,
      required: [true, 'chuyến bay phải được bắt đầu từ sân bay nào'],
    },
    to: {
      type: String,
      required: [true, 'chuyến bay phải đi đến sân bay nào'],
    },
  },
  time: {
    departure: {
      type: Date,
      required: [true, 'ngày đi của chuyến bay phải có giá trị'],
    },
    arrival: {
      type: Date,
      required: [true, 'ngày đến của chuyến bay phải có giá trị'],
    },
  },
  date: [Date],
  tickets: {
    phoThong: {
      price: {
        type: Number,
        required: [true, 'giá phổ thông của chuyến bay phải có giá trị'],
      },
      soLuongVe: {
        type: Number,
        required: [
          true,
          'số lượng vé phổ thông của chuyến bay phải có giá trị',
        ],
      },
    },
    phoThongDacBiet: {
      price: {
        type: Number,
        default: 0,
      },
      soLuongVe: {
        type: Number,
        default: 0,
      },
    },
    thuongGia: {
      price: {
        type: Number,
        default: 0,
      },
      soLuongVe: {
        type: Number,
        default: 0,
      },
    },
    hangNhat: {
      price: {
        type: Number,
        default: 0,
      },
      soLuongVe: {
        type: Number,
        default: 0,
      },
    },
  },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
