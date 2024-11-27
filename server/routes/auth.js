
const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Register Page
router.get('/register', (req, res) => {
  res.render('auth/register');
});

/// Register User
router.post('/register', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
    });
    await User.register(user, req.body.password);
    passport.authenticate('local')(req, res, () => {
      req.flash('success', `Welcome, ${user.username}`);
      res.redirect('/todos');
    });
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/auth/register');
  }
});

// Login Page
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Login User
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/todos',
    failureRedirect: '/auth/login',
    failureFlash: true,
    successFlash: 'Welcome back!',
  })
);

// Logout User
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash('error', 'Failed to log out.');
      return res.redirect('/todos');
    }
    req.flash('success', 'You have logged out.');
    res.redirect('/');
  });
});

module.exports = router;
