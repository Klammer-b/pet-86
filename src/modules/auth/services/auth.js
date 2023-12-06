const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersService = require('../../users/services/users');
const HttpError = require('../../common/models/HttpError');
const { JWT_SECRET } = require('../../common/constants/env');

class AuthService {
  constructor(usersService) {
    this.usersService = usersService;
  }

  async register(payload) {
    const { password, ...rest } = payload;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await usersService.createUser({
      ...rest,
      password: passwordHash,
    });
    return user;
  }

  async login(payload) {
    const { email, password } = payload;
    const user = await usersService.findByEmail(email);

    if (!user) {
      throw new HttpError(404, 'User not found!');
    }

    const arePasswordsEqual = await bcrypt.compare(password, user.password);
    if (!arePasswordsEqual) {
      throw new HttpError(401, 'Email and password does not match!');
    }

    const token = jwt.sign(
      {
        sub: user._id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: 3600 },
    );

    return token;
  }
}

const authService = new AuthService(usersService);

module.exports = authService;
