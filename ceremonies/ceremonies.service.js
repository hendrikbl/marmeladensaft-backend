const db = require('../_helpers/db');

const { Ceremony } = db;

async function getAll() {
  return Ceremony.find();
}

async function getById(id) {
  return Ceremony.findById(id);
}

async function create(params) {
  const ceremony = new Ceremony(params);
  await ceremony.save();
}

async function update(id, params) {
  const ceremony = await Ceremony.findById(id);

  if (!ceremony) throw 'Ceremony not found';

  Object.assign(ceremony, params);
  await ceremony.save();
}

async function remove(id) {
  await Ceremony.findByIdAndRemove(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};
