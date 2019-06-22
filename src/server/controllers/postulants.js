/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
const Projects = require('../models/projects');
const Mes = require('../models/mes');
const Users = require('../models/users');

router.post('/:project_id/postulant', (req, res) => {
  if (!req.params.project_id) {
    res.status(404).json({ errors: 'project is required' });
    return;
  }

  ['collaborator_id', 'task_id', 'phase'].forEach((attr) => {
    if (!req.body[attr]) {
      res.status(404).json({ errors: `${attr} is required` });
    }
  });

  Mes.findOne({ id: req.body.collaborator_id })
    .then((me) => {
      if (!me) {
        res.status(404).json({ errors: 'me not found' });
        return;
      }

      const postulation = req.body;
      postulation.collaborator = me;

      Projects.findOne({ id: req.params.project_id })
        .then((project) => {
          if (!project) {
            res.status(404).json({ errors: 'project not found' });
            return;
          }

          Projects.update({
            _id: project._id
          },
          {
            $push: {
              postulants: postulation
            },
          })
            .then(() => {
              Projects.findOne({ _id: project._id })
                .then((newProject) => {
                  res.status(200).json(newProject);
                })
                .catch((err) => {
                  res.status(500).json({ message: 'Something went wrong', error: err.message });
                });
            })
            .catch((err) => {
              res.status(500).json({ message: 'Something went wrong', error: err.message });
            });
        });
    });
});

router.delete('/:project_id/postulants/:postulant_id', (req, res) => {
  if (!req.params.project_id) {
    res.status(404).json({ errors: 'project_id is required' });
    return;
  }
  if (!req.params.postulant_id) {
    res.status(404).json({ errors: 'postulant_id is required' });
    return;
  }

  Projects.findOne({ id: req.params.project_id, 'postulants.id': req.params.postulant_id })
    .then((project) => {
      if (!project) {
        res.status(404).json({ errors: 'project / postulant not found' });
        return;
      }

      const postulant = project.postulants.filter(p => p.id === req.params.postulant_id)[0];

      Projects.update({
        _id: project._id,
        'postulants.id': req.params.postulant_id
      },
      {
        $pull: {
          postulants: postulant
        }
      })
        .then(() => {
          Projects.findOne({ _id: project._id })
            .then((newProject) => {
              res.status(200).json(newProject);
            })
            .catch((err) => {
              res.status(500).json({ message: 'Something went wrong', error: err.message });
            });
        })
        .catch((err) => {
          res.status(500).json({ message: 'Something went wrong', error: err.message });
        });
    });
});

router.post('/:project_id/postulants/:postulant_id/accept', (req, res) => {
  if (!req.params.project_id) {
    res.status(404).json({ errors: 'project_id is required' });
    return;
  }
  if (!req.params.postulant_id) {
    res.status(404).json({ errors: 'postulant_id is required' });
    return;
  }

  Projects.findOne({ id: req.params.project_id, 'postulants.id': req.params.postulant_id })
    .then((project) => {
      if (!project) {
        res.status(404).json({ errors: 'project / postulant not found' });
        return;
      }
      const postulantIndex = project.postulants.findIndex(p => p.id === req.params.postulant_id);
      const postulant = project.postulants[postulantIndex];
      if (!postulant) {
        res.status(404).json({ errors: 'postulant not found' });
      }
      if (!postulant.collaborator) {
        res.status(404).json({ errors: `postulant ${postulant.id} doesn't has collaborator set` });
      }

      const phaseIndex = project.phases.findIndex(p => p.id === postulant.phase);
      const phase = project.phases[phaseIndex];
      if (!phase) {
        res.status(404).json({ errors: `phase ${postulant.phase} not found` });
        return;
      }
      const taskIndex = phase.tasks.findIndex(t => t.id === postulant.task_id);
      const task = phase.tasks[taskIndex];
      if (!task) {
        res.status(404).json({ errors: `task ${postulant.task_id} not found` });
      }

      project.phases[phaseIndex].tasks[taskIndex].collaborator = postulant.collaborator;
      project.postulants.splice(postulantIndex, 1);

      Projects.updateOne({ _id: project._id }, {
        phases: project.phases,
        postulants: project.postulants
      })
        .then(() => {
          res.status(200).json(project);
        })
        .catch((err) => {
          res.status(500).json({ message: 'Something went wrong', error: err.message });
        });
    });
});

// / Get all the projects that I'm postulated to
router.get('/postulants/:user_id', (req, res) => {
  if (!req.params.user_id) {
    res.status(404).json({ errors: 'user not found' });
    return;
  }

  Users.findOne({ id: req.params.user_id })
    .populate({
      path: 'postulants.collaborator',
      select: '-_id -__v',
      populate: [{
        path: 'user',
        select: '-_id -__v'
      }]
    })
    .then((user) => {
      if (!user || !user._id) {
        res.status(404).json({ errors: 'user not found' });
        return;
      }

      const nameFilter = new RegExp(`.*${req.query.name || ''}.*`);
      const descFilter = new RegExp(`.*${req.query.description || ''}.*`);
      const catFilter = new RegExp(`.*${req.query.category || ''}.*`);
      const regionFilter = new RegExp(`.*${req.query.region || ''}.*`);
      const filter = {
        'postulants.collaborator': user.collaborator,
        name: { $regex: nameFilter, $options: 'i' },
        category: { $regex: catFilter, $options: 'i' },
        region: { $regex: regionFilter, $options: 'i' },
        description: { $regex: descFilter, $options: 'i' }
      };
      if (req.query.tags) {
        filter.tags = { $in: req.query.tags.split(',') };
      }
      if (req.query.only_need_collaboration) {
        filter.need_collaborations = true;
        filter.finished = false;
        filter['phases.tasks.collaborator'] = null;
      }

      Projects.find(filter, '-_id -__v -rating_sum -rating_count')
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
          path: 'phases.tasks.collaborator',
          select: '-_id -__v',
          populate: [{
            path: 'user',
            select: '-_id -__v',
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

        .then((projects) => {
          res.status(200).json({ projects });
        })
        .catch((err) => {
          res.status(500).json({ message: 'Something went wrong', error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong', error: err });
    });
});

module.exports = router;
