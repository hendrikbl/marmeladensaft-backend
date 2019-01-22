const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  movieId: { type: String, required: true },
  categoryId: { type: String, required: true },
  ceremonyId: { type: String, required: true },
  isWinner: { type: Boolean, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Nomination', schema);
