const express = require('express');

const router = express.Router();
const userService = require('./users.service');
const votesService = require('../votes/votes.service');

function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then((user) => {
      if (user) {
        res.cookie('token', user.token);
        res.json(user);
      } else {
        res.status(400).json({ message: 'Username or password is incorrect' });
      }

      next();
    })
    .catch(err => next(err));
}

function register(req, res, next) {
  userService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  userService.getById(req.user.sub)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService.getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  userService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function remove(req, res, next) {
  userService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getVotes(req, res, next) {
  votesService.getByUser(req.params.id)
    .then(votes => res.json(votes))
    .catch(err => next(err));
}

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/:id/votes', getVotes);

module.exports = router;
