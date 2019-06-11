var express = require('express')
const params = require('params');
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
        .find({ owner: id }, '-_id -__v -rating_sum -rating_count')
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

router.get('/', function (req, res) {
  Projects
  .find()
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

router.get('/:id', function (req, res) {
  if (!req.params.id) {
    res.status(404).json({ errors: 'project not found' })
    return;
  }

  let id = req.params.id
  Projects
    .findOneAndUpdate({ id: id }, { $inc: { view_counts: 1 } }, { fields: '-_id -__v -rating_sum -rating_count' })
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

router.post('/:user_id/projects/', function (req, res) {
  if (!req.params.user_id) {
    res.status(404).json({ errors: 'owner user is required' })
    return;
  }

  Users.find({ id: req.params.user_id })
    .then(user => {
      if (!user || !user[0]._id) {
        res.status(404).json({ errors: 'invalid owner user' })
        return;
      }
      let user_id = user[0]._id
      let project = Projects(req.body)
      project['project_leader'] = undefined;
      project['owner'] = undefined;
      project['promoted_level'] = undefined;
      project['rating'] = undefined;
      project['view_counts'] = 0;
      project['collaborations'] = [];
      project['postulants'] = [];
      project.owner = user_id

      console.log(project); 

      project.save()
        .then(newProject => {
          res.status(200).json(newProject)
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: 'Something went wrong', error: err.message })
        })
    })
})

router.put('/:id', function (req, res) {
  const permittedParams = [
    'name', 'description', 'category', 'current_phase', 'start_date', 'end_date', 'images',
    'need_collaborations', 'promoted_level', 'region', 'require_shipping',
    'shipping_address', 'tags', 'collaborations'
  ]
  Projects.findOne({ id: req.params.id })
    .then(project => {
      if (project) {
        let parameters = params(req.body).only(permittedParams)
        project.set(parameters)
        project.save()
          .then(updatedProject => {
            res.status(200).json(updatedProject)
          })
          .catch(err => {
            res.status(500).json({ message: 'Something went wrong', error: err.message })
          })
      } else {
        res.status(404).json({ errors: 'project not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong', error: err.message })
    })
})

router.post('/:id/rate', function (req, res) {
  Projects.findOne({ id: req.params.id })
    .then(project => {
      if (project) {
        let rating = req.body.rating

        if (rating >= 1 && rating <= 5) {

          console.log(project.rating_sum ,project.rating_count)
          if (!project.rating_sum) { project.rating_sum = 0}
          if (!project.rating_count) { project.rating_count = 0}
          project.rating_sum += rating
          project.rating_count += 1
          project.rating = (project.rating_sum / project.rating_count).toFixed(2);
          project.save()
            .then(updatedProject => {
              res.status(200).json(updatedProject)
            })
            .catch(err => {
              res.status(500).json({ message: 'Something went wrong', error: err.message })
            })
        } else {
          res.status(403).json({ errors: 'Invalid rating. Should be between 1 and 5' })
        }
      } else {
        res.status(404).json({ errors: 'project not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong', error: err.message })
    })
})

router.delete('/:id', function (req, res) {
  Projects.findOne({ id: req.params.id })
    .then(result => {
      if (result) {
        Projects.deleteOne({ id: req.params.id })
          .then(status => {
            res.status(200).json({ result: 'ok' })
          })
          .catch(err => {
            res.status(500).json({ message: 'Something went wrong', error: err })
          })
      } else {
        res.status(404).json({ errors: 'project not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong', error: err.message })
    })
})

module.exports = router
