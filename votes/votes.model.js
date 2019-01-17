const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  nominationId: { type: String, required: true },
  userId: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Vote', schema);
