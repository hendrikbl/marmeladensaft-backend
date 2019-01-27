require('dotenv').config();
const express = require('express');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

const app = express();
const router = express.Router();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/api/v1/categories', require('./categories/categories.controller'));
app.use('/api/v1/ceremonies', require('./ceremonies/ceremonies.controller'));
app.use('/api/v1/nominations', require('./nominations/nominations.controller'));
app.use('/api/v1/users', require('./users/users.controller'));
app.use('/api/v1/votes', require('./votes/votes.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
