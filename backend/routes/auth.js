// auth routes
const express = require('express');
const passport = require('./googlePassport');

const authRoutes = express.Router();

authRoutes.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRoutes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to dashboard or home page.
    res.redirect('/dashboard');
  }
);

authRoutes.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = authRoutes;
