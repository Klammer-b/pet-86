const jwt = require('jsonwebtoken');
const HttpError = require('../../modules/common/models/HttpError');
const { JWT_SECRET } = require('../../modules/common/constants/env');
const usersService = require('../../modules/users/services/users');

const auth = async (req, res, next) => {
  const authHeader = req.headers['authorization'] || '';

  if (!authHeader) {
    return next(new HttpError(401, 'Unauthorized'));
  }

  const [_, token] = authHeader.split(' ');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return next(new HttpError(401, 'Unauthorized'));
  }

  const user = await usersService.findById(payload.sub);

  req.user = user;

  next();
};

module.exports = auth;
