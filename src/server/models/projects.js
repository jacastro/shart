const mongoose = require('mongoose');
const uuid = require('node-uuid');

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  id: { type: String, default: uuid.v1 },
  name: { type: String, required: true, maxlength: 500 },
  description: { type: String, required: true, maxlength: 5000 },
  category: { type: String, required: true, maxlength: 100 },
  current_phase: { type: String, required: true, maxlength: 50 },
  start_date: { type: Date, required: true },
  end_date: Date,
  images: [String],
  need_collaborations: { type: Boolean, required: true },
  finished: { type: Boolean, required: true },
  project_leader: { type: Schema.Types.ObjectId, ref: 'Me' },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  promoted_level: String,
  rating: { type: Number, min: 1, max: 5 },
  rating_sum: { type: Number, min: 0 },
  rating_count: { type: Number, min: 0 },
  region: { type: String, required: true, maxlength: 100 },
  require_shipping: { type: Boolean, required: true },
  shipping_address: String,
  tags: [String],
  view_counts: { type: Number, min: 0 },
  phases: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      tasks: [
        {
          id: { type: String, required: true },
          name: { type: String, required: true },
          status: { type: String, required: true },
          collaborator: { type: Schema.Types.ObjectId, ref: 'Me' }
        }
      ]
    }
  ],
  postulants: [
    {
      id: { type: String, default: uuid.v1 },
      phase: String,
      task_id: String,
      task_name: String,
      status: String,
      collaborator: { type: Schema.Types.ObjectId, ref: 'Me' }
    }
  ],
});

module.exports = mongoose.model('Project', ProjectSchema);
