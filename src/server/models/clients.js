var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var autoIncrementModelID = require('../helpers/mongo')
var Schema = mongoose.Schema

var ClientSchema = new Schema({
  id: { type: Number, unique: true, min: 1 },
  full_name: { type: String, required: true, maxlength: 200 },
  phone: { type: String, maxlength: 100 },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

ClientSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('clients', this, next);
});

ClientSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Client', ClientSchema)
