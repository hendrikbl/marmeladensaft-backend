const db = require('../_helpers/db');

const { Nomination } = db;

async function getAll() {
  return Nomination.find();
}

async function getById(id) {
  return Nomination.findById(id);
}

async function create(params) {
  const nomination = new Nomination(params);
  await nomination.save();
}

async function update(id, params) {
  const nomination = await Nomination.findById(id);

  if (!nomination) throw 'Nomination not found';

  Object.assign(nomination, params);
  await nomination.save();
}

async function remove(id) {
  await Nomination.findByIdAndRemove(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};
