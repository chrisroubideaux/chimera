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
    console.log('req.user:', req.user);
    if (req.user) {
      const adminId = req.user._id;
      res.redirect(`http://localhost:3001/admins/${adminId}`);
    } else {
      res.redirect('/');
    }
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
