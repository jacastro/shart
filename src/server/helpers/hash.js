const Bcrypt = require('bcrypt');

const Salt = 10;
const JWT = require('jsonwebtoken');
const User = require('../models/users');
const Key = require('../key');

module.exports.hash = (pass, callback) => {
  Bcrypt.hash(pass, Salt)
    .then((hashedPassword) => {
      if (callback) {
        callback(hashedPassword);
      }
    });
};

module.exports.hash_compare = (pass, hashToCompare, callback) => {
  Bcrypt.compare(pass, hashToCompare, (err, result) => {
    if (callback) {
      callback(result);
    }
  });
};

module.exports.jwt_user = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');

    JWT.verify(token, Key.tokenKey, (err, payload) => {
      if (payload) {
        User.findOne({ id: payload.user_id })
          .then((user) => {
            req.user = user;
            next();
          });
      } else {
        next();
      }
    });
  } catch (e) {
    next();
  }
};
