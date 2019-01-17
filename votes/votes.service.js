const db = require('../_helpers/db');

const { Vote } = db;

async function getAll() {
  return Vote.find();
}

async function getById(id) {
  return Vote.findById(id);
}

async function create(params) {
  const vote = new Vote(params);
  await vote.save();
}

async function update(id, params) {
  const vote = await Vote.findById(id);

  if (!vote) throw 'Vote not found';

  Object.assign(vote, params);
  await vote.save();
}

async function remove(id) {
  await Vote.findByIdAndRemove(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};
