const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

class UserService {
  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) return { status: 404, message: 'Email is not exist!!!' };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { status: 401, message: 'Password incorrect!' };

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    });
    return {
      status: 200,
      data: {
        token,
        role: user.role,
        user: { _id: user._id, fullname: user.fullname, email: user.email },
      },
    };
  }

  async register(userData) {
    const user = await userRepository.findByEmail(userData.email);
    if (user) return { status: 400, message: 'Account is exist!!!' };

    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    await userRepository.createUser(userData);
    return { status: 200, message: 'Tạo tài khoản thành công' };
  }

  async getAllUsers() {
    const users = await userRepository.getAllUsers();
    return { status: 200, data: { results: users.length, users } };
  }

  async changePassword(email, newPassword) {
    const user = await userRepository.findByEmail(email);
    if (!user) return { status: 404, message: 'User not found' };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await userRepository.updatePassword(
      email,
      hashedPassword,
    );
    return { status: 200, data: { user: updatedUser } };
  }
}

module.exports = new UserService();
