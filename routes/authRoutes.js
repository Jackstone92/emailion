const passport = require('passport');

module.exports = app => {
  // passport google authentication route //
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      // scope specifies access we want to have within the user's profile //
      scope: ['profile', 'email']
    })
  );

  // passport google callback route //
  app.get('/auth/google/callback', passport.authenticate('google'));
};
