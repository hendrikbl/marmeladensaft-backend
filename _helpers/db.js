const mongoose = require('mongoose');
const User = require('../users/users.model');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
  User,
};
