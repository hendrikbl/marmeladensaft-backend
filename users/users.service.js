const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

const { User } = db;

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, process.env.APP_SECRET);
    return {
      ...userWithoutHash,
      token,
    };
  }
}

async function getAll() {
  return User.find().select('-hash');
}

async function getById(id) {
  return User.findById(id).select('-hash');
}

async function create(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw `Username "${userParam.username}" is already taken`;
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

async function update(id, userParam) {
  const user = await User.findById(id);
  const { username } = userParam;

  // validate
  if (!user) throw 'User not found';
  if (user.username !== username && await User.findOne({ username })) {
    throw `Username "${username}" is already taken`;
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function remove(id) {
  await User.findByIdAndRemove(id);
}

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: remove,
};
