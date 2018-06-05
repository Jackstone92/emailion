module.exports = (req, res, next) => {
  // check if user has enough credits //
  if (req.user.credits < 1) {
    // end request early and send error message //
    return res.status(403).send({ error: 'You do not have enough credits!' });
  }

  // user has enough credits //
  next();
};
