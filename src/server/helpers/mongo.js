/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const counterSchema = new Schema(
  {
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
  }
);

counterSchema.index({ _id: 1, seq: 1 }, { unique: true });

const counterModel = mongoose.model('counter', counterSchema);

const autoIncrementModelID = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate(
    modelName, // The ID to find for in counters model
    { $inc: { seq: 1 } }, // The update
    { new: true, upsert: true }, // The options
    (error, counter) => { // The callback
      if (error) return next(error);

      doc.id = counter.seq;
      next();
    }
  );
};

module.exports = autoIncrementModelID;
