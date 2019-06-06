var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var autoIncrementModelID = require('../helpers/mongo')
var Schema = mongoose.Schema

var ProjectSchema = new Schema({
  id: {type: Number, unique: true, min: 1},
  name: {type: String, required: true, maxlength: 50},
  description: {type: String, required: true, maxlength: 5000},
  category: {type: String, required: true, maxlength: 100},
  current_phase: {type: String, required: true, maxlength: 50},
  start_date: {type: Date, required: true},
  end_date: Date,
  images: [String],
  need_collaborations: {type: Boolean, required: true},
  project_leader: {type: Schema.Types.ObjectId, ref: 'Me' },
  owner: {type: Schema.Types.ObjectId, ref: 'User' },
  promoted_level: String,
  rating: {type: Number, min: 1, max: 5},
  rating_sum: {type: Number, min: 0},
  rating_count: {type: Number, min: 0},
  region: {type: String, required: true, maxlength: 100},
  require_shipping: {type: Boolean, required: true},
  shipping_address: String,
  tags: [String],
  view_counts: {type: Number, min: 0},
  phases: [
    {
      id: {type: String, required: true},
      name: {type: String, required: true},
      tasks: [
        {
          id: {type: String, required: true},
          name: {type: String, required: true},
          status: {type: String, required: true},
          collaborator: {type: Schema.Types.ObjectId, ref: 'Me' }
        }
      ]
    }
  ],
  postulants: [
    {
      phase: String,
      task: String,
      status: String,
      collaborator: {type: Schema.Types.ObjectId, ref: 'Me' }
    }
  ],
})

ProjectSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('projects', this, next);
});

ProjectSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Project', ProjectSchema)
