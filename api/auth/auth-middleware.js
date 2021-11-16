const Users = require('../users/users-model');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets/index');

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({ status: 401, message: 'token required' });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      next({
        status: 401,
        message: 'token invalid',
        stack: err.message,
      });
    } else {
      req.decodedJwt = decoded;
      next();
    }
  });
};

const checkUserNameAvailable = async (req, res, next) => {
  try {
    const { username } = req.body;
    const [user] = await Users.getBy({ username });
    if (user) {
      next({ status: 403, message: 'Username is unavailable' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateUser = async (req, res, next) => {
  try {
    const { username, password, email, first_name, last_name } = req.body;
    if (!username || !password || !first_name || !last_name || !email) {
      next({
        status: 400,
        message: 'username, password, and name are required',
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateCredentials = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      next({ status: 400, message: 'username and password are required' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkUsernameExists = async (req, res, next) => {
  try {
    const { username } = req.body;
    const [user] = await Users.getBy({ username });
    if (!user) {
      next({ status: 401, message: 'invalid credentials' });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkUserNameAvailable,
  validateUser,
  validateCredentials,
  checkUsernameExists,
  restricted
};
