var express = require('express')
var router = express.Router()
var Auth = require('../helpers/hash')
var Users = require('../models/users')
var FullContact = require('../helpers/fullContact')

router.get('/', function (req, res) {
  Users.find().sort('user_name').select({ __v: 0, _id: 0 })
    .then(result => {
      res.status(200).json({ users: result })
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong', error: err })
    })
})

router.get('/:id', function (req, res) {
  Users.findOne({ id: req.params.id }, (err, result) => {
    if (result) {
      res.status(200).json(result)
    } else {
      res.status(404).json({ errors: 'user not found' })
    }
  })
})

router.post('/', function (req, res) {
  FullContact.get_fullcontact_info(req.body.email, fullContactData => {
    var user = Users({
      email: req.body.email.toLowerCase().trim(),
      user_name: req.body.user_name,
      full_contact_data: fullContactData || {}
    })

    user.save()
      .then(newUser => {
        res.status(200).json(newUser)
      })
      .catch(err => {
        res.status(500).json({ message: 'Something went wrong', error: err.message })
      })
  })
})

router.put('/:id', function (req, res) {
  Users.findOne({ id: req.params.id }, (err, result) => {
    if (result) {
      Users.updateOne({ id: req.params.id }, {
        user_name: req.body.user_name || result.user_name
      }).then((err, status) => {
        res.status(200).json({ result: 'ok' })
      })
        .catch(err => {
          res.status(500).json({ message: 'Something went wrong', error: err.message })
        })
    } else {
      res.status(404).json({ errors: 'user not found' })
    }
  })
})

router.delete('/', function (req, res) {
  Users.findOne({ id: req.params.id }, (err, result) => {
    if (result) {
      Users.deleteOne({ id: req.params.id })
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
})
module.exports = router
