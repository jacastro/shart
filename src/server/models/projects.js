var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var autoIncrementModelID = require('../helpers/mongo')
var Schema = mongoose.Schema

var ProjectSchema = new Schema({
  id: {type: Number, unique: true, min: 1},
  name: {type: String, required: true, maxlength: 50},
  description: String,
  category: {type: String, required: true, maxlength: 100},
  current_phase: String, required: true, maxlength: 50,
  start_date: Date,
  end_date: Date,
  images: [String],
  need_collaborations: Boolean,
  project_leader: {type: Schema.Types.ObjectId, ref: 'Me' },
  owner: {type: Schema.Types.ObjectId, ref: 'User' },
  promoted_level: String,
  rating: {type: Number, min: 1},
  region: String,
  require_shipping: Boolean,
  shipping_address: String,
  tags: [String],
  view_counts: {type: Number, min: 1},
  collaborations: [
    {
      stage: String,
      collaborator: {type: Schema.Types.ObjectId, ref: 'Me' }
    }
  ],
  postulants: [
    {
      stage: String,
      collaborator: {type: Schema.Types.ObjectId, ref: 'Me' }
    }
  ],
})

UserSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('projects', this, next);
});

UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Project', ProjectSchema)
