var express = require('express')
var router = express.Router()
var Users = require('../models/users')
var Projects = require('../models/projects')

// Get all my projects /api/users/:user_id/projects
router.get('/:user_id/projects/', function (req, res) {
  if (!req.params.user_id) {
    res.status(404).json({ errors: 'user not found' })
    return;
  }

  Users.find({ id: req.params.user_id })
    .then(user => {
      if (!user || !user[0]._id) {
        res.status(404).json({ errors: 'user not found' })
        return;
      }
      let id = user[0]._id
      Projects
        .find({ owner: id }, '-_id -__v')
        .populate('owner', '-_id -__v')
        .populate({
          path: 'project_leader',
          select: '-_id -__v',
          populate: [{
            path: 'user',
            select: '-_id -__v'
          }]
        })
        .populate({
          path: 'collaborations.collaborator',
          select: '-_id -__v',
          populate: [{
            path: 'user',
            select: '-_id -__v'
          }]
        })
        .populate({
          path: 'postulants.collaborator',
          select: '-_id -__v',
          populate: [{
            path: 'user',
            select: '-_id -__v'
          }]
        })

        .then(projects => {
          res.status(200).json({ projects: projects })
        })
        .catch(err => {
          res.status(500).json({ message: 'Something went wrong', error: err })
        })
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong', error: err })
    })
})

router.get('/:id', function (req, res) {
  if (!req.params.id) {
    res.status(404).json({ errors: 'project not found' })
    return;
  }

  let id = req.params.id
  Projects
  .findOne({ id: id }, '-_id -__v')
  .populate('owner', '-_id -__v')
    .populate({
      path: 'project_leader',
      select: '-_id -__v',
      populate: [{
        path: 'user',
        select: '-_id -__v'
      }]
    })
    .populate({
      path: 'collaborations.collaborator',
      select: '-_id -__v',
      populate: [{
        path: 'user',
        select: '-_id -__v'
      }]
    })
    .populate({
      path: 'postulants.collaborator',
      select: '-_id -__v',
      populate: [{
        path: 'user',
        select: '-_id -__v'
      }]
    })

    .then(project => {
      if (project) {
        res.status(200).json(project)
      } else {
        res.status(404).json({ errors: 'project not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong', error: err })
    })
})

router.post('/', function (req, res) {
  res.status(500).json({ message: 'TBD', error: err })

  // FullContact.get_fullcontact_info(req.body.email, fullContactData => {
  //   var user = Users({
  //     email: req.body.email.toLowerCase().trim(),
  //     user_name: req.body.user_name,
  //     full_contact_data: fullContactData || {}
  //   })

  //   user.save()
  //     .then(newUser => {
  //       res.status(200).json(newUser)
  //     })
  //     .catch(err => {
  //       res.status(500).json({ message: 'Something went wrong', error: err.message })
  //     })
  // })
})

router.put('/:id', function (req, res) {
  res.status(500).json({ message: 'TBD', error: err })
  // Users.findOne({ id: req.params.id }, (err, result) => {
    //   if (result) {
  //     Users.updateOne({ id: req.params.id }, {
    //       user_name: req.body.user_name || result.user_name
  //     }).then((err, status) => {
    //       res.status(200).json({ result: 'ok' })
  //     })
  //       .catch(err => {
    //         res.status(500).json({ message: 'Something went wrong', error: err.message })
    //       })
  //   } else {
    //     res.status(404).json({ errors: 'user not found' })
    //   }
  // })
})

router.delete('/', function (req, res) {
  res.status(500).json({ message: 'TBD', error: err })
  // Users.findOne({ id: req.params.id }, (err, result) => {
  //   if (result) {
  //     Users.deleteOne({ id: req.params.id })
  //       .then((err, status) => {
  //         res.status(200).json({ result: 'ok' })
  //       })
  //       .catch(err => {
  //         res.status(500).json({ message: 'Something went wrong', error: err })
  //       })
  //   } else {
  //     res.status(404).json({ errors: 'user not found' })
  //   }
  // })
})
module.exports = router
