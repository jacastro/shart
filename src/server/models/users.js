var mongoose = require('mongoose')
var uuid = require('node-uuid')
var uniqueValidator = require('mongoose-unique-validator')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  id: { type: String, default: uuid.v1 },
  email: { type: String, required: true, maxlength: 50, unique: true },
  digest: { type: String, required: true, maxlength: 60 },
  name: { type: String, required: true, maxlength: 50 },
  full_contact_data: {}
})

UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', UserSchema)
