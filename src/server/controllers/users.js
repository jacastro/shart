var express = require('express')
var router = express.Router()
var Auth = require('../helpers/hash')
var Users = require('../models/users')
var FullContact = require('../helpers/fullContact')

// List users, allow unsigned user
router.get('/', function (req, res) {
  Users.find().sort('name').select({ __v: 0, _id: 0 })
    .then(result => {
      res.status(200).json({ users: result })
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong', error: err })
    })
})

// Create a New User, allow unsigned user
router.post('/', function (req, res) {
  if (req.body.pass.length >= 8) {
    Auth.hash(req.body.pass, hash => {
      FullContact.get_fullcontact_info(req.body.email, fullContactData => {
        var user = Users({
          email: req.body.email.toLowerCase().trim(),
          digest: hash,
          name: req.body.name,
          full_contact_data: fullContactData
        })

        user.save()
          .then(newUser => {
            res.status(200).json({ user: newUser })
          })
          .catch(err => {
            res.status(500).json({ message: 'Something went wrong', error: err.message })
          })
      })
    })
  } else {
    res.json({ message: 'Password must be 8 characters or more' })
  }
})

// Update a user, only signed user
router.put('/', function (req, res) {
  if (req.user) {
    Users.findOne({ id: req.user.id }, (err, result) => {
      if (result) {
        Auth.hash(req.body.pass, hash => {
          Users.updateOne({ id: req.user.id }, {
            digest: hash
          }).then((err, status) => {
            res.status(200).json({ result: 'ok' })
          })
            .catch(err => {
              res.status(500).json({ message: 'Something went wrong', error: err.message })
            })
        })
      } else {
        res.status(404).json({ errors: 'user not found' })
      }
    })
  } else {
    res.status(403).json({ errors: 'please sign in' })
  }
})

// Delete a user, only signed user
router.delete('/', function (req, res) {
  if (req.user) {
    Users.findOne({ id: req.user.id }, (err, result) => {
      if (result) {
        Users.deleteOne({ id: req.user.id })
          .then((err, status) => {
            res.status(200).json({ result: 'ok' })
          })
          .catch(err => {
            res.status(500).json({ message: 'Something went wrong', error: err })
          })
      } else {
        res.status(404).json({ errors: 'user not found' })
      }
    })
  } else {
    res.status(403).json({ errors: 'please sign in' })
  }
})

module.exports = router
