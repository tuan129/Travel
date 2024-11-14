const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightCode: {
    type: String,
    required: [true, 'mã chuyến bay phải có giá trị'],
    unique: true,
    match: /^[A-Z]{2}\d{3}$/,
    message:
      'mã chuyến bay phải bắt đầu 2 chữ cái in hoa, và sau đó là 4 chữ số',
  },
  airlines: {
    type: String,
    required: [true, 'hãng hàng không phải có giá trị'],
  },
  airfield: {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Airfield',
      required: [true, 'Chuyến bay phải được bắt đầu từ sân bay nào'],
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Airfield',
      required: [true, 'Chuyến bay phải đi đến sân bay nào'],
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
      bookedSeats: [String],
      soVeCon: {
        type: Number,
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
      bookedSeats: [String],
      soVeCon: {
        type: Number,
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
      bookedSeats: [String],
      soVeCon: {
        type: Number,
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
      bookedSeats: [String],
      soVeCon: {
        type: Number,
      },
    },
  },
});

flightSchema.pre('save', function (next) {
  if (this.tickets.phoThong && !this.tickets.phoThong.soVeCon) {
    this.tickets.phoThong.soVeCon = this.tickets.phoThong.soLuongVe;
  }
  if (this.tickets.phoThongDacBiet && !this.tickets.phoThongDacBiet.soVeCon) {
    this.tickets.phoThongDacBiet.soVeCon =
      this.tickets.phoThongDacBiet.soLuongVe;
  }
  if (this.tickets.thuongGia && !this.tickets.thuongGia.soVeCon) {
    this.tickets.thuongGia.soVeCon = this.tickets.thuongGia.soLuongVe;
  }
  if (this.tickets.hangNhat && !this.tickets.hangNhat.soVeCon) {
    this.tickets.hangNhat.soVeCon = this.tickets.hangNhat.soLuongVe;
  }
  next();
});

const Flight = mongoose.model('flight', flightSchema);

module.exports = Flight;
