/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
const Projects = require('../models/projects');
const Mes = require('../models/mes');

router.post('/:project_id/postulant', (req, res) => {
  if (!req.params.project_id) {
    res.status(404).json({ errors: 'project is required' });
    return;
  }

  ['collaborator_id', 'task_id', 'task_name', 'phase'].forEach((attr) => {
    if (!req.body[attr]) {
      res.status(404).json({ errors: `${attr} is required` });
      // eslint-disable-next-line no-useless-return
      return;
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

      const postulant = project.postulants.filter(p => p.id === req.params.postulant_id)[0];
      const phase = project.phases.filter(p => p.id === postulant.phase);
      if (!phase) {
        res.status(404).json({ errors: 'phase not found' });
        return;
      }


      Projects.update({
        _id: project._id,
        'postulants.id': req.params.postulant_id,
        'phases.id': phase.id,
      },
      {
        $pull: {
          postulants: postulant
        },
        $push: {
          'phases.$.tasks': {
            id: postulant.task_id,
            name: postulant.task_name,
            status: postulant.status,
            collaborator: postulant.collaborator
          }
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

module.exports = router;
