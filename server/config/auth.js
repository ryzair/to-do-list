
const passport = require('passport');
const User = require('../models/user');

module.exports = (app) => {
  // Session setup
  app.use(
    require('express-session')({
      secret: 'secretKey', // Replace with a secure key in production
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
