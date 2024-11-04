const { mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true,
  },
  fullname: {
    type: String,
    required: [true, 'Người dùng phải có tên'],
  },
  email: {
    type: String,
    required: [true, 'Người dùng phải có email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Email không hợp lệ',
    ],
  },
  password: {
    type: String,
    required: [true, 'Người dùng phải có mật khẩu'],
    minlength: 8,
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;