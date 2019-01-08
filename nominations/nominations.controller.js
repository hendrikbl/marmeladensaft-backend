const express = require('express');

const router = express.Router();
const nominationsService = require('./nominations.service');

function create(req, res, next) {
  nominationsService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  nominationsService.getAll()
    .then(nominations => res.json(nominations))
    .catch(err => next(err));
}

function getById(req, res, next) {
  nominationsService.getById(req.params.id)
    .then(nomination => (nomination ? res.json(nomination) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  nominationsService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function remove(req, res, next) {
  nominationsService.delete(req.params.id)
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
