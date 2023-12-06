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
}

const usersRepository = new UsersRepository();

module.exports = usersRepository;
