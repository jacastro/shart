const express = require('express');

const router = express.Router();
const Clients = require('../models/clients');

router.get('/', (req, res) => {
  Clients.find()
    .sort('full_name').select('-_id -__v')
    .populate('user', '-_id -__v')
    .then((result) => {
      res.status(200).json({ clients: result });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong', error: err });
    });
});

router.get('/:id', (req, res) => {
  Clients.findOne({ id: req.params.id })
    .select('-_id -__v')
    .populate('user', '-_id -__v')
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ errors: 'client not found' });
      }
    });
});

router.post('/', (req, res) => {
  res.status(500).json({ message: 'Not implemented in MVP' });
});

router.put('/:id', (req, res) => {
  res.status(500).json({ message: 'Not implemented in MVP' });
});

router.delete('/', (req, res) => {
  res.status(500).json({ message: 'Not implemented in MVP' });
});
module.exports = router;
