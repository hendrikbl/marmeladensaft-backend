const express = require('express');

const router = express.Router();
const categoriesService = require('./categories.service');
const nominationsService = require('../nominations/nominations.service');

function create(req, res, next) {
  categoriesService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  categoriesService.getAll()
    .then(categories => res.json(categories))
    .catch(err => next(err));
}

function getById(req, res, next) {
  categoriesService.getById(req.params.id)
    .then(category => (category ? res.json(category) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  categoriesService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function remove(req, res, next) {
  categoriesService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getNominations(req, res, next) {
  const query = {
    ceremonyId: req.body.ceremonyId,
    categoryId: req.params.id,
  };
  nominationsService.find(query)
    .then(nominations => (res.json(nominations)))
    .catch(err => next(err));
}

// routes
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);
router.post('/:id/nominations', getNominations);

module.exports = router;
