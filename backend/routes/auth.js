// auth routes
const express = require('express');
const passport = require('./googlePassport');
const authRoutes = express.Router();

authRoutes.get(
  '/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRoutes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('req.user:', req.user);
    if (req.user) {
      const id = req.user.id;
      res.redirect(`http://localhost:3000/admins/${id}`);
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

// Google OAuth login route
authRoutes.get(
  '/google/login',
  passport.authenticate('google', { scope: ['email', 'openid', 'profile'] })
);

module.exports = authRoutes;
