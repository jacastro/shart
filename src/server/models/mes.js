/* eslint-disable func-names */
const mongoose = require('mongoose');
const uuid = require('node-uuid');

const { Schema } = mongoose;

const MeSchema = new Schema({
  id: { type: String, default: uuid.v1 },
  full_name: { type: String, required: true, maxlength: 200 },
  phone: { type: String, maxlength: 100 },
  biography: { type: String, maxlength: 500 },
  address: { type: String, maxlength: 200 },
  city: { type: String, maxlength: 100 },
  postal_code: { type: String, maxlength: 15 },
  tags: { type: [String] },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Me', MeSchema);
