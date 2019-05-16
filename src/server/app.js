require('dotenv').config()
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var urlDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uade_sem2_shart'
var mongoose = require('mongoose')
var port = process.env.PORT || 9090
var JWT = require('./helpers/hash')
var LogMiddleware = require('./helpers/log')

app.use(LogMiddleware.logger_middleware)
// Auth middleware
// app.use(JWT.jwt_user)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.use('/api/users', require('./controllers/users'))
app.use('/api/auth', require('./controllers/auth'))
mongoose.connect(urlDB)

app.get('/api', function (req, res) {
  res.send({ result: 'happy to be here' })
})

app.listen(port, function () {
  console.log('app listening on port ' + port)
})

module.exports = app
