var express = require('express')
var router = express.Router()
var Auth = require('../helpers/hash')
var Key = require('../key')
var JWT = require('jsonwebtoken')
var Users = require('../models/users')

// Signing
router.post('/signin', function (req, res) {
  Users
    .findOne({ email: req.body.email.toLowerCase().trim() }, (err, result) => {
      if (result) {
        Auth.hash_compare(req.body.pass, result.digest, match => {
          if (match) {
            const jwtToken = JWT.sign({
              user_id: result.id,
              email: result.email,
              user_name: result.name
            }, Key.tokenKey)

            let json = Object.assign({}, result._doc, { token: jwtToken })
            res.status(200).json(json)
          } else {
            res.status(403).json({ message: 'Invalid Password/Username' })
          }
        })
      } else {
        res.status(403).json({ message: 'Invalid Password/Username' })
      }
    })
})

module.exports = router
