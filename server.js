require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/categories', require('./categories/categories.controller'));
app.use('/ceremonies', require('./ceremonies/ceremonies.controller'));
app.use('/nominations', require('./nominations/nominations.controller'));
app.use('/users', require('./users/users.controller'));
app.use('/votes', require('./votes/votes.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
