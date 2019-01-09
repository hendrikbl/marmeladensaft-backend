const mongoose = require('mongoose');
const User = require('../users/users.model');
const Ceremony = require('../ceremonies/ceremonies.model');
const Category = require('../categories/categories.model');
const Nomination = require('../nominations/nominations.model');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
  User,
  Ceremony,
  Category,
  Nomination,
};
