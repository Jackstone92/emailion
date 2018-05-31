const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// access the mongoose users model //
const User = mongoose.model('users');

// passport method to serialize user into a cookie //
passport.serializeUser((user, done) => {
  // generate identifying piece of info in order for passport to set up a cookie for us -> user.id //
  // make use of id assigned to this record by MongoDB //
  // .id is a shortcut to string //
  return done(null, user.id);
});

// passport method to deserialize cookie back into a user //
passport.deserializeUser(async (id, done) => {
  // search through user collection and return user with corresponding id //
  const user = await User.findById(id);
  return done(null, user);
});

// passport config //
passport.use(
  new GoogleStrategy(
    // internal identifier of 'google' //
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    // callback function to handle access token //
    async (accessToken, refreshToken, profile, done) => {
      // query if User collection has googleId equal to profile.id to determine if login or signup //
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // already have a record with the given profile.id //
        // call 'done' to exit passport's callback function: done(<error>, <user>) //
        return done(null, existingUser);
      }
      // existingUser does not exist //
      // create new model instance (.save to make persistent) //
      const user = await new User({ googleId: profile.id }).save();
      return done(null, user);
    }
  )
);
