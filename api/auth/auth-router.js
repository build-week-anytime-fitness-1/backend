const router = require('express').Router();
const Users = require('../users/users-model');
const { BCRYPT_ROUNDS } = require('../secrets/index');
const bcrypt = require('bcryptjs');
const {
  checkUserNameAvailable,
  validateUser,
  validateCredentials,
  checkUsernameExists,
} = require('./auth-middleware');
const tokenBuilder = require('./token-builder');

router.post(
  '/register',
  validateUser,
  checkUserNameAvailable,
  async (req, res, next) => {
    try {
      const user = req.body;
      const hash = bcrypt.hashSync(user.password, Number(BCRYPT_ROUNDS));
      user.password = hash;
      const newUser = await Users.add(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/login', validateCredentials, async (req, res, next) => {
    try {
        const user = req.user;
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = tokenBuilder(user);
          res.status(200).json({ message: `Welcome, ${user.username}` });
        } else {
          next({ status: 401, message: 'invalid credentials' });
        }
      } catch (err) {
        next(err);
      }
    }
  );

module.exports = router;
