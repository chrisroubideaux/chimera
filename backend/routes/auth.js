// auth routes
const express = require('express');
const passport = require('./googlePassport');
const authRoutes = express.Router();
{
  /*
authRoutes.get(
  '/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
*/
}
authRoutes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('req.user:', req.user);
    if (req.user) {
      const id = req.user.id;
      res.redirect(`https://chimera-green.vercel.app/admins/${id}`);
    } else {
      res.redirect('/');
    }
  }
);

// Logout Route
authRoutes.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.clearCookie('token');

    res.status(200).json({ message: 'Logged out successfully' });

    res.redirect('https://chimera-green.vercel.app/login');
  });
});

// Google OAuth login route
authRoutes.get(
  '/google/login',
  passport.authenticate('google', { scope: ['email', 'openid', 'profile'] })
);

// Facebook OAuth callback route
authRoutes.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Authenticated user:', req.user);
    if (req.user) {
      const { role, id } = req.user;
      console.log(`Role: ${role}, ID: ${id}`);

      if (role === 'admin') {
        res.redirect(`https://chimera-green.vercel.app/admins/${id}`);
      } else if (role === 'agent') {
        res.redirect(`https://chimera-green.vercel.app/agents/${id}`);
      } else if (role === 'user') {
        res.redirect(`https://chimera-green.vercel.app/users/${id}`);
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  }
);

// Facebook Register Route (Optional if login and register are the same)
authRoutes.get(
  '/facebook/register',
  passport.authenticate('facebook', { scope: ['email'] })
);

//
// Middleware to check roles
function checkRole(role) {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user && req.user.role === role) {
      return next();
    }
    res.status(403).json({ message: 'Forbidden: Insufficient role' });
  };
}

authRoutes.get('/admin', checkRole('admin'), (req, res) => {
  res.redirect(`/admins/${req.user._id}`);
});

authRoutes.get('/employees', checkRole('employee'), (req, res) => {
  res.redirect(`/employees/${req.user._id}`);
});

authRoutes.get('/users', checkRole('user'), (req, res) => {
  res.redirect(`/users/${req.user._id}`);
});

module.exports = authRoutes;
