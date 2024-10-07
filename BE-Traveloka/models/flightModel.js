const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightCode: {
    type: String,
    required: [true, 'mã chuyến bay phải có giá trị'],
  },
  Airlines: {
    type: String,
    required: [true, 'hãng hàng không phải có giá trị'],
  },
  airfield: {
    from: {
      type: String,
      required: [true, 'chuyến bay phải được bắt đầu từ đâu'],
    },
    to: {
      type: String,
      required: [true, 'chuyến bay phải đi đến đâu'],
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
        required: [
          true,
          'giá phổ thông đặc biệt của chuyến bay phải có giá trị',
        ],
      },
      soLuongVe: {
        type: Number,
        required: [
          true,
          'số lượng vé phổ thông đặc biệt của chuyến bay phải có giá trị',
        ],
      },
    },
    thuongGia: {
      price: {
        type: Number,
        required: [true, 'giá thương gia của chuyến bay phải có giá trị'],
      },
      soLuongVe: {
        type: Number,
        required: [
          true,
          'số lượng vé thương gia của chuyến bay phải có giá trị',
        ],
      },
    },
    hangNhat: {
      price: {
        type: Number,
        required: [true, 'giá hạng nhất của chuyến bay phải có giá trị'],
      },
      soLuongVe: {
        type: Number,
        required: [
          true,
          'số lượng vé hạng nhất của chuyến bay phải có giá trị',
        ],
      },
    },
  },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
