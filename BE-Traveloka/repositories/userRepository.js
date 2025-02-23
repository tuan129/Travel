const Account = require('../models/userModel');

class UserRepository {
  async findByEmail(email) {
    return await Account.findOne({ email });
  }

  async createUser(userData) {
    return await new Account(userData).save();
  }

  async getAllUsers() {
    return await Account.find({});
  }

  async updatePassword(email, hashedPassword) {
    const user = await Account.findOne({ email });
    if (user) {
      user.password = hashedPassword;
      await user.save();
    }
    return user;
  }
}

module.exports = new UserRepository();
