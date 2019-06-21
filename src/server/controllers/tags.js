const express = require('express');

const router = express.Router();
const Mes = require('../models/mes');
const Projects = require('../models/projects');

// Get all my projects /api/users/:user_id/projects
router.get('/', (req, res) => {
  Mes.find().distinct('tags')
    .then((userTags) => {
      const tags = userTags || [];

      Projects.find().distinct('tags')
        .then((projectTags) => {
          const results = (projectTags || []).concat(tags);

          res.status(200).json(results || []);
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
