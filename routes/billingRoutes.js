// import keys //
const keys = require('../config/keys');
// import stripe and pass it the secret key //
const stripe = require('stripe')(keys.stripeSecretKey);

// import requireLogin middleware //
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  // use requireLogin middleware as second argument //
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // create stripe charge object from req.body (parsed by bodyParser) //
    // stripe automatically returns a promise - no need for callback function //
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    // update user model and add 5 credits //
    req.user.credits += 5;
    // persist save //
    const user = await req.user.save();
    // return newly updated user model //
    res.send(user);
  });
};
