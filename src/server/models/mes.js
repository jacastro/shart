var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var autoIncrementModelID = require('../helpers/mongo')
var Schema = mongoose.Schema

var MeSchema = new Schema({
  id: { type: Number, unique: true, min: 1 },
  full_name: { type: String, required: true, maxlength: 200 },
  phone: { type: String, maxlength: 100 },
  biography: { type: String, maxlength: 500 },
  address: { type: String, maxlength: 200 },
  city: { type: String, maxlength: 100 },
  postal_code: { type: String, maxlength: 15 },
  tags: { type: [String] },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

MeSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('me', this, next);
});

MeSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Me', MeSchema)
