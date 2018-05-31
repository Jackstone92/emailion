// take in req and res, next is the 'done' callback //
module.exports = (req, res, next) => {
  // check if user is signed in //
  if (!req.user) {
    // end request early and send error message //
    return res.status(401).send({ error: 'You must be logged in!' });
  }

  // user is logged in //
  next();
};
