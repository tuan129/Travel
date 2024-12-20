const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Account = require('../models/userModel');
// module.exports = new AuthController()

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check email
    const user = await Account.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // Tạo và gửi token JWT về cho client
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '2d',
        });

        res.json({
          token,
          role: user.role,
          user: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
          },
        });
      } else {
        return res.status(401).json({ message: 'Password incorrect!' });
      }
    } else {
      return res.status(404).json({ message: 'Email is not exist!!!' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error server!' });
  }
};

const register = async (req, res) => {
  const { email, password, ...accountData } = req.body;
  try {
    // Check tài khoản đã tồn tại hay chưa
    const user = await Account.findOne({ email });
    if (!user) {
      // Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Lưu newUser
      const newUser = new Account({
        email,
        password: hashedPassword,
        ...accountData,
      });
      await newUser
        .save()
        .then(() =>
          res.status(200).json({
            status: 'success',
            message: 'Tạo tài khoản thành công',
          }),
        )
        .catch((err) => {
          res.status(500).json({
            status: 'fail',
            message: 'Tạo tài khoản thất bại',
            error: err,
          });
        });
    } else {
      return res.status(400).json({
        status: 'fail',
        message: 'Account is exist!!!',
      });
    }
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Account.find(req.params);
    res.json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await Account.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'User not found' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

module.exports = { login, register, getAllUsers, changePassword };
