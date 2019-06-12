/* eslint-disable func-names */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrementModelID = require('../helpers/mongo');

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: { type: Number, unique: true, min: 1 },
  email: { type: String, required: true, maxlength: 50, unique: true },
  user_name: { type: String, required: true, maxlength: 50 },
  full_contact_data: {}
});

UserSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('users', this, next);
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);
