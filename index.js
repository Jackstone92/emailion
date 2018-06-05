// import express using common.js modules //
// Currently, Node.js only supports common.js modules - 'import' no support for es2015 modules yet //
const express = require('express');
// require mongoose //
const mongoose = require('mongoose');
// require cooki-session //
const cookieSession = require('cookie-session');
const passport = require('passport');
// import bodyparser so that express can parse POST requests //
const bodyParser = require('body-parser');

const keys = require('./config/keys');
// require models //
require('./models/User');
require('./models/Survey');

// require services/passport config //
require('./services/passport');

// connect mongoose to MongoDB //
mongoose.connect(keys.mongoURI);

// set up application //
const app = express();

// middleware: //
app.use(bodyParser.json());
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

// require route functions and execute them with the express app object //
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// production environment routes for directing routes to react-router //
if (process.env.NODE_ENV === 'production') {
  // express will serve up production assets eg. main.js or main.css //
  app.use(express.static('client/build'));

  // express will serve up index.html if it doesn't recognise route //
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// heroku dynamic port from injected environment variables //
const PORT = process.env.PORT || 5000;
// instruct Node to listen on port //
app.listen(PORT);
