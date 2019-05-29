var express = require('express')
var router = express.Router()
var Clients = require('../models/clients')

router.get('/', function (req, res) {
  Clients.find()
     .sort('full_name').select({ __v: 0, _id: 0 })
     .populate('user', { __v: 0, _id: 0 })
    .then(result => {
      res.status(200).json({ micro_entrepreneur: result })
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong', error: err })
    })
})

router.get('/:id', function (req, res) {
  Clients.findOne({ id: req.params.id }, (err, result) => {
    if (result) {
      res.status(200).json(result)
    } else {
      res.status(404).json({ errors: 'micro entrepreneur not found' })
    }
  })
})

router.post('/', function (req, res) {
  res.status(500).json({ message: 'Not implemented in MVP' })
})

router.put('/:id', function (req, res) {
  res.status(500).json({ message: 'Not implemented in MVP' })
})

router.delete('/', function (req, res) {
  res.status(500).json({ message: 'Not implemented in MVP' })
})
module.exports = router
