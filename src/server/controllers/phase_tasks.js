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
        res.status(404).json({ errors: 'phase not found' });
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

router.put('/:project_id/phases/:phase_id/tasks/:task_id', (req, res) => {
  if (!req.params.project_id) {
    res.status(404).json({ errors: 'project_id is required' });
    return;
  }
  if (!req.params.phase_id) {
    res.status(404).json({ errors: 'phase_id is required' });
    return;
  }
  if (!req.params.task_id) {
    res.status(404).json({ errors: 'task_id is required' });
    return;
  }

  Projects.findOne({ id: req.params.project_id, 'phases.id': req.params.phase_id, 'phases.tasks.id': req.params.task_id })
    .then((project) => {
      if (!project) {
        res.status(404).json({ errors: 'task not found' });
        return;
      }

      console.log(project);

      const phase = project.phases.filter(p => p.id === req.params.phase_id)[0] || { tasks: [] };
      const index = phase.tasks.findIndex(t => t.id === req.params.task_id);
      const task = phase.tasks[index];
      const editedTask = Object.assign(task, req.body);

      phase.tasks[index] = editedTask;

      Projects.update({
        _id: project._id,
        'phases.id': req.params.phase_id,
        'phases.tasks.id': req.params.task_id,
      },
      {
        $set: {
          'phases.$.tasks': phase.tasks
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

router.delete('/:project_id/phases/:phase_id/tasks/:task_id', (req, res) => {
  if (!req.params.project_id) {
    res.status(404).json({ errors: 'project_id is required' });
    return;
  }
  if (!req.params.phase_id) {
    res.status(404).json({ errors: 'phase_id is required' });
    return;
  }
  if (!req.params.task_id) {
    res.status(404).json({ errors: 'task_id is required' });
    return;
  }

  Projects.findOne({ id: req.params.project_id, 'phases.id': req.params.phase_id, 'phases.tasks.id': req.params.task_id })
    .then((project) => {
      if (!project) {
        res.status(404).json({ errors: 'task not found' });
        return;
      }

      const phase = project.phases.filter(p => p.id === req.params.phase_id)[0] || { tasks: [] };
      const tasks = phase.tasks.filter(t => t.id !== req.params.task_id);

      Projects.update({
        _id: project._id,
        'phases.id': req.params.phase_id,
        'phases.tasks.id': req.params.task_id,
      },
      {
        $set: {
          'phases.$.tasks': tasks
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
