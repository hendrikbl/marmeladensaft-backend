const express = require('express');

const router = express.Router();
const votesService = require('./votes.service');

function create(req, res, next) {
  votesService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  votesService.getAll()
    .then(votes => res.json(votes))
    .catch(err => next(err));
}

function getById(req, res, next) {
  votesService.getById(req.params.id)
    .then(vote => (vote ? res.json(vote) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  votesService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function remove(req, res, next) {
  votesService.delete(req.params.id)
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
