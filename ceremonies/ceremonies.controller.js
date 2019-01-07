const express = require('express');

const router = express.Router();
const ceremonyService = require('./ceremonies.service');

function create(req, res, next) {
  ceremonyService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  ceremonyService.getAll()
    .then(ceremonies => res.json(ceremonies))
    .catch(err => next(err));
}

function getById(req, res, next) {
  ceremonyService.getById(req.params.id)
    .then(ceremony => (ceremony ? res.json(ceremony) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  ceremonyService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function remove(req, res, next) {
  ceremonyService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}

// routes
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
