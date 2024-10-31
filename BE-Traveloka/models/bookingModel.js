const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Người dùng phải tồn tại'],
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'flight',
    required: [true, 'Phải có một chuyến bay được chọn'],
  },
  infoContact: {
    fullName: {
      type: String,
      required: [true, 'Phải có tên người liên hệ'],
    },
    phone: {
      type: String,
      required: [true, 'Phải có SĐT người liên hệ '],
    },
    email: {
      type: String,
      required: [true, 'Phải có email người liên hệ '],
    },
  },
  infoCustomers: [
    {
      fullName: {
        type: String,
        required: [true, 'Phải có tên của khách hàng'],
      },
      nationality: {
        type: String,
        required: [true, 'Khách hàng phải khai báo quốc tịch của mình'],
      },
      birthDay: {
        type: Date,
        required: [true, 'Khách hàng phải nhập ngày sinh'],
      },
      customerType: {
        type: String,
        enum: ['adult', 'child', 'infant'],
        required: [true, 'Phải có kiểu khách hàng'],
      },
      seatNumber: {
        type: String,
        required: [true, 'Phải có vị trí ngồi'],
      },
    },
  ],
  seatClass: {
    type: String,
    enum: ['phoThong', 'phoThongDacBiet', 'thuongGia', 'hangNhat'],
    required: [true, 'khách hàng phải có một hạng ghế '],
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    required: [true, 'Phải có tổng giá tiền Booking'],
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;