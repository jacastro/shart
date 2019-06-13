/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const JWT = require('jsonwebtoken');
const Auth = require('../helpers/hash');
const Key = require('../key');
const Users = require('../models/users');

// Signing
router.post('/signin', (req, res) => {
  Users
    .findOne({ email: req.body.email.toLowerCase().trim() }, (err, result) => {
      if (result) {
        Auth.hash_compare(req.body.pass, result.digest, (match) => {
          if (match) {
            const jwtToken = JWT.sign({
              user_id: result.id,
              email: result.email,
              user_name: result.name
            }, Key.tokenKey);

            const json = Object.assign({}, result._doc, { token: jwtToken });
            res.status(200).json(json);
          } else {
            res.status(403).json({ message: 'Invalid Password/Username' });
          }
        });
      } else {
        res.status(403).json({ message: 'Invalid Password/Username' });
      }
    });
});

module.exports = router;
