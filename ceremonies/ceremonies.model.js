const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  number: { type: Number, unique: true, required: true },
  eventDate: { type: Date, unique: true },
  host: { type: String },
  categories: { type: Array },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Ceremonie', schema);
