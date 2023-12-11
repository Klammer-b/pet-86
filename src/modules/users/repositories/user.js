const User = require('../models/User');

class UsersRepository {
  async create(payload) {
    const user = await User.create(payload);
    return user;
  }

  async findByEmail(email) {
    const users = await User.find().where('email').equals(email);

    return users[0];
  }

  async findById(id) {
    const user = await User.findById(id);

    return user;
  }

  async findUserByRefreshToken(token) {
    const users = await User.find().where('refreshToken').equals(token);

    return users[0];
  }

  async updateById(id, payload) {
    const user = await User.findByIdAndUpdate(id, payload);
    return user;
  }
}

const usersRepository = new UsersRepository();

module.exports = usersRepository;
