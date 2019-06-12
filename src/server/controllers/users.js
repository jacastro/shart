const express = require('express');

const router = express.Router();
const Users = require('../models/users');
const FullContact = require('../helpers/fullContact');

router.get('/', (req, res) => {
  Users.find().sort('user_name').select('-_id -__v')
    .then((result) => {
      res.status(200).json({ users: result });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong', error: err });
    });
});

router.get('/:id', (req, res) => {
  Users.findOne({ id: req.params.id })
    .select('-_id -__v')
    .populate('user', '-_id -__v')
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ errors: 'user not found' });
      }
    });
});

router.post('/', (req, res) => {
  FullContact.get_fullcontact_info(req.body.email, (fullContactData) => {
    const user = Users({
      email: req.body.email.toLowerCase().trim(),
      user_name: req.body.user_name,
      full_contact_data: fullContactData || {}
    });

    user.save()
      .then((newUser) => {
        res.status(200).json(newUser);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
      });
  });
});

router.put('/:id', (req, res) => {
  Users.findOne({ id: req.params.id }, (err, result) => {
    if (result) {
      Users.updateOne({ id: req.params.id }, {
        user_name: req.body.user_name || result.user_name
      }).then(() => {
        res.status(200).json({ result: 'ok' });
      }).catch((err2) => {
        res.status(500).json({ message: 'Something went wrong', error: err2.message });
      });
    } else {
      res.status(404).json({ errors: 'user not found' });
    }
  });
});

router.delete('/', (req, res) => {
  Users.findOne({ id: req.params.id }, (_, result) => {
    if (result) {
      Users.deleteOne({ id: req.params.id })
        .then(() => {
          res.status(200).json({ result: 'ok' });
        }).catch((err2) => {
          res.status(500).json({ message: 'Something went wrong', error: err2 });
        });
    } else {
      res.status(404).json({ errors: 'user not found' });
    }
  });
});
module.exports = router;
