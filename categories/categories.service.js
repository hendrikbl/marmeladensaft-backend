const db = require('../_helpers/db');

const { Category } = db;

async function getAll() {
  return Category.find();
}

async function getById(id) {
  return Category.findById(id);
}

async function create(params) {
  const category = new Category(params);
  await category.save();
}

async function update(id, params) {
  const category = await Category.findById(id);

  if (!category) throw 'Category not found';

  Object.assign(category, params);
  await category.save();
}

async function remove(id) {
  await Category.findByIdAndRemove(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};
