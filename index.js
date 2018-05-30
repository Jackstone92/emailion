// import express using common.js modules //
// Currently, Node.js only supports common.js modules - 'import' no support for es2015 modules yet //
const express = require('express');
// require mongoose //
const mongoose = require('mongoose');
// require cooki-session //
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
// require models //
require('./models/User');

// require services/passport config //
require('./services/passport');

// connect mongoose to MongoDB //
mongoose.connect(keys.mongoURI);

// set up application //
const app = express();
// tell express to make use of cookies //
app.use(
  cookieSession({
    // how long this cookie can exist before it is expired -> 30 days //
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // key to encrypt cookie //
    keys: [keys.cookieKey]
  })
);
// tell passport to use cookies to manage authentication //
app.use(passport.initialize());
app.use(passport.session());

// require authRoutes function and execute it with the express app object //
require('./routes/authRoutes')(app);

// heroku dynamic port from injected environment variables //
const PORT = process.env.PORT || 5000;
// instruct Node to listen on port //
app.listen(PORT);
