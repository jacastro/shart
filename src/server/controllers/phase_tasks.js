/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
const Projects = require('../models/projects');

router.post('/:project_id/phases/:id/tasks', (req, res) => {
  if (!req.params.project_id) {
    res.status(404).json({ errors: 'project is required' });
    return;
  }
  if (!req.params.id) {
    res.status(404).json({ errors: 'phase id is required' });
    return;
  }

  Projects.findOne({ id: req.params.project_id, 'phases.id': req.params.id })
    .then((project) => {
      if (!project) {
        res.status(404).json({ errors: 'invalid project' });
        return;
      }

      Projects.update({
        _id: project._id,
        'phases.id': req.params.id,
      },
      {
        $push: {
          'phases.$.tasks': req.body
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

module.exports = router;
