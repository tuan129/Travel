const userService = require('../services/userService');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.status(result.status).json(result.data || { message: result.message });
  } catch (err) {
    res.status(500).json({ message: 'Error server!' });
  }
};

const register = async (req, res) => {
  try {
    const result = await userService.register(req.body);
    res.status(result.status).json({
      status: result.status === 200 ? 'success' : 'fail',
      message: result.message,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Tạo tài khoản thất bại',
      error: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const result = await userService.changePassword(email, newPassword);
    res.status(result.status).json(result.data || { message: result.message });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

module.exports = { login, register, getAllUsers, changePassword };
