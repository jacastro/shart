/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const params = require('params');

const router = express.Router();
const Users = require('../models/users');
const Mes = require('../models/mes');
const Projects = require('../models/projects');

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function findProjects(req, res, filter = {}, sort, limit = 999) {
  const nameFilter = new RegExp(`.*${req.query.name || ''}.*`);
  const descFilter = new RegExp(`.*${req.query.description || ''}.*`);
  const catFilter = new RegExp(`.*${req.query.category || ''}.*`);
  const regionFilter = new RegExp(`.*${req.query.region || ''}.*`);
  filter.name = { $regex: nameFilter, $options: 'i' };
  filter.category = { $regex: catFilter, $options: 'i' };
  filter.region = { $regex: regionFilter, $options: 'i' };
  filter.description = { $regex: descFilter, $options: 'i' };
  if (req.query.tags) {
    filter.tags = { $in: req.query.tags.split(',') };
  }
  if (req.query.only_need_collaboration) {
    filter.need_collaborations = true;
    filter.finished = false;
    filter['phases.tasks.collaborator'] = null;
  }

  if (req.query.limit) {
    limit = parseInt(req.query.limit, 10);
  }

  const orderBy = sort || {};
  Projects.find(filter, '-_id -__v -rating_sum -rating_count', orderBy)
    .limit(limit)
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
      if (!sort) {
        res.status(200).json(shuffle(projects));
        return;
      }

      res.status(200).json({ projects });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong', error: err });
    });
}

// Get all my projects /api/users/:user_id/projects
router.get('/:user_id/projects/', (req, res) => {
  if (!req.params.user_id) {
    res.status(404).json({ errors: 'user not found' });
    return;
  }

  Users.find({ id: req.params.user_id })
    .then((user) => {
      if (!user || !user[0]._id) {
        res.status(404).json({ errors: 'user not found' });
        return;
      }
      const id = user[0]._id;

      const filter = {
        owner: id
      };

      findProjects(req, res, filter);
    });
});

// Get all projects I'm working on /api/users/:user_id/working-projects
router.get('/:user_id/working-projects/', (req, res) => {
  if (!req.params.user_id) {
    res.status(404).json({ errors: 'user not found' });
    return;
  }

  Users.findOne({ id: req.params.user_id })
    .populate('me')
    .then((user) => {
      if (!user) {
        res.status(404).json({ errors: 'user not found' });
        return;
      }
      if (!user.me) {
        res.status(404).json({ errors: 'user is not ME' });
        return;
      }

      const filter = {
        'phases.tasks.collaborator': user.me,
        finished: false
      };

      const orderBy = { sort: { raiting: 'desc' } };
      findProjects(req, res, filter, orderBy, 5);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong', error: err });
    });
});

// Get top 3 rated projects
router.get('/top-rated/', (req, res) => {
  const orderBy = { sort: { rating: 'desc' } };
  findProjects(req, res, undefined, orderBy, 3);
});

// Get top 3 viewed projects
router.get('/top-viewed/', (req, res) => {
  const orderBy = { sort: { view_counts: 'desc' } };
  findProjects(req, res, undefined, orderBy, 3);
});

// Get top 3 new projects
router.get('/top-new/', (req, res) => {
  const orderBy = { sort: { start_date: 'desc' } };
  findProjects(req, res, undefined, orderBy, 3);
});

// Get all
router.get('/', (req, res) => {
  findProjects(req, res);
});

// router.get('/', (req, res) => {
//   const nameFilter = new RegExp(`.*${req.query.name || ''}.*`);
//   const descFilter = new RegExp(`.*${req.query.description || ''}.*`);
//   const catFilter = new RegExp(`.*${req.query.category || ''}.*`);
//   const regionFilter = new RegExp(`.*${req.query.region || ''}.*`);
//   const filter = {
//     name: { $regex: nameFilter, $options: 'i' },
//     category: { $regex: catFilter, $options: 'i' },
//     region: { $regex: regionFilter, $options: 'i' },
//     description: { $regex: descFilter, $options: 'i' }
//   };
//   if (req.query.tags) {
//     filter.tags = { $in: req.query.tags.split(',') };
//   }
//   if (req.query.only_need_collaboration) {
//     filter.need_collaborations = true;
//     filter.finished = false;
//     filter['phases.tasks.collaborator'] = null;
//   }

//   Projects.find(filter, '-_id -__v -rating_sum -rating_count')
//     .populate('owner', '-_id -__v')
//     .populate({
//       path: 'project_leader',
//       select: '-_id -__v',
//       populate: [{
//         path: 'user',
//         select: '-_id -__v'
//       }]
//     })
//     .populate({
//       path: 'phases.tasks.collaborator',
//       select: '-_id -__v',
//       populate: [{
//         path: 'user',
//         select: '-_id -__v',
//       }]
//     })
//     .populate({
//       path: 'postulants.collaborator',
//       select: '-_id -__v',
//       populate: [{
//         path: 'user',
//         select: '-_id -__v'
//       }]
//     })
//     .then((projects) => {
//       res.status(200).json({ projects });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: 'Something went wrong', error: err });
//     });
// });

router.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(404).json({ errors: 'project not found' });
    return;
  }

  const { id } = req.params;
  Projects
    .findOneAndUpdate({ id }, { $inc: { view_counts: 1 } }, { fields: '-_id -__v -rating_sum -rating_count' })
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

    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ errors: 'project not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong', error: err });
    });
});

router.post('/:user_id/projects/', (req, res) => {
  if (!req.params.user_id) {
    res.status(404).json({ errors: 'owner user is required' });
    return;
  }

  Users.find({ id: req.params.user_id })
    .then((user) => {
      if (!user || !user[0]._id) {
        res.status(404).json({ errors: 'invalid owner user' });
        return;
      }
      const userId = user[0]._id;
      const project = Projects(req.body);
      project.project_leader = undefined;
      project.owner = undefined;
      project.promoted_level = undefined;
      project.rating = undefined;
      project.view_counts = 0;
      project.collaborations = [];
      project.postulants = [];
      project.owner = userId;

      project.save()
        .then((newProject) => {
          res.status(200).json(newProject);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: 'Something went wrong', error: err.message });
        });
    });
});

router.put('/:id', (req, res) => {
  const permittedParams = [
    'name', 'description', 'category', 'current_phase', 'start_date', 'end_date', 'images',
    'need_collaborations', 'promoted_level', 'region', 'require_shipping',
    'shipping_address', 'tags', 'collaborations', 'finished'
  ];
  Projects.findOne({ id: req.params.id })
    .then(async (project) => {
      if (project) {
        if (req.params.phases) {
          await project.phases.forEach((phase1) => {
            const p2 = req.params.phases.find(phase2 => phase2.id === phase1.id);

            if (p2) {
              phase1.name = p2.name;

              if (p2.tasks) {
                phase1.tasks.forEach(async (task1) => {
                  const t2 = p2.tasks.find(task2 => task2.id === task1.id);

                  if (t2) {
                    task1.name = t2.name;
                    task1.status = t2.status;

                    if (t2.collaborator) {
                      const me = await Mes.findOne({ id: t2.collaborator.id });
                      task1.collaborator = me._id;
                    }
                  }
                });
              }
            }
          });
        }


        const parameters = params(req.body).only(permittedParams);
        project.set(parameters);
        project.save()
          .then((updatedProject) => {
            res.status(200).json(updatedProject);
          })
          .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err.message });
          });
      } else {
        res.status(404).json({ errors: 'project not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong', error: err.message });
    });
});

router.post('/:id/rate', (req, res) => {
  Projects.findOne({ id: req.params.id })
    .then((project) => {
      if (project) {
        const { rating } = req.body;

        if (rating >= 1 && rating <= 5) {
          console.log(project.rating_sum, project.rating_count);
          if (!project.rating_sum) { project.rating_sum = 0; }
          if (!project.rating_count) { project.rating_count = 0; }
          project.rating_sum += rating;
          project.rating_count += 1;
          project.rating = (project.rating_sum / project.rating_count).toFixed(2);
          project.save()
            .then((updatedProject) => {
              res.status(200).json(updatedProject);
            })
            .catch((err) => {
              res.status(500).json({ message: 'Something went wrong', error: err.message });
            });
        } else {
          res.status(403).json({ errors: 'Invalid rating. Should be between 1 and 5' });
        }
      } else {
        res.status(404).json({ errors: 'project not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong', error: err.message });
    });
});

router.delete('/:id', (req, res) => {
  Projects.findOne({ id: req.params.id })
    .then((result) => {
      if (result) {
        Projects.deleteOne({ id: req.params.id })
          .then(() => {
            res.status(200).json({ result: 'ok' });
          })
          .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err });
          });
      } else {
        res.status(404).json({ errors: 'project not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong', error: err.message });
    });
});

module.exports = router;
