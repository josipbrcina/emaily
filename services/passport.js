const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// Create token for cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve user model from cookie
passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    // Executed after the callback (google authentication)
    (accessToken, refreshToken, profile, done) => {
      // Find user
      User.findOne({ googleId: profile.id})
        .then(existingUser => {
          if (existingUser) {
            // User exists, call done
            done(null, existingUser);
          } else {
            // User doesn't exist, create new user inside MongoDb
            new User({ googleId: profile.id })
              .save()
              .then(savedUser => done(null, savedUser));
          }
      })
    }
  )
);
