require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const urlDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uade_sem2_shart';
const mongoose = require('mongoose');

const port = process.env.PORT || 80;
// var JWT = require('./helpers/hash')
const LogMiddleware = require('./helpers/log');

app.use(LogMiddleware.logger_middleware);
// Auth middleware
// app.use(JWT.jwt_user)

app.use(express.static(path.join(__dirname, '../../dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.use('/api/users', require('./controllers/users'));
app.use('/api/clients', require('./controllers/clients'));
app.use('/api/mes', require('./controllers/mes'));
app.use('/api/auth', require('./controllers/auth'));

mongoose.connect(urlDB);

app.get('/api', (req, res) => {
  res.send({ result: 'happy to be here' });
});


// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  const list = ['item1', 'item2', 'item3', 'item1', 'item2', 'item3', 'item1', 'item2', 'item3'];
  res.json(list);
  console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}../../../dist/index.html`));
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

module.exports = app;
