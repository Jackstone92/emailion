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
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    // redirect on success //
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  // logout route //
  app.get('/api/logout', (req, res) => {
    // logout using passport //
    // req.user is destroyed by passport //
    req.logout();
    // redirect back to root route //
    res.redirect('/');
  });

  // test route to verify successful authentication //
  app.get('/api/current_user', (req, res) => {
    // test to make sure req.user exists //
    res.send(req.user);
  });
};
