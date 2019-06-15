/* eslint-disable func-names */
const mongoose = require('mongoose');
const uuid = require('node-uuid');

const { Schema } = mongoose;

const ClientSchema = new Schema({
  id: { type: String, default: uuid.v1 },
  full_name: { type: String, required: true, maxlength: 200 },
  phone: { type: String, maxlength: 100 },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Client', ClientSchema);
