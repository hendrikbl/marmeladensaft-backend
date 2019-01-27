const expressJwt = require('express-jwt');
const userService = require('../users/users.service');

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}

function jwt() {
  const secret = process.env.APP_SECRET;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/api/v1/users/authenticate',
      '/api/v1/users/register',
    ],
  });
}


module.exports = jwt;
