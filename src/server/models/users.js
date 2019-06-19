/* eslint-disable func-names */
const mongoose = require('mongoose');
const uuid = require('node-uuid');

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: { type: String, default: uuid.v1 },
  email: { type: String, required: true, maxlength: 50, unique: true },
  user_name: { type: String, required: true, maxlength: 50 },
  full_contact_data: {}
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

UserSchema.virtual('me', {
  ref: 'Me',
  localField: '_id',
  foreignField: 'user',
  justOne: true
});

UserSchema.virtual('client', {
  ref: 'Client',
  localField: '_id',
  foreignField: 'user',
  justOne: true
});

module.exports = mongoose.model('User', UserSchema);
