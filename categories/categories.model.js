const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, unique: true, required: true},
  description: { type: String}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Category', schema);
