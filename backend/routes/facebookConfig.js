// Facebook config
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../users/userModel');
const Employee = require('../employees/employeeModel');
const Admin = require('../admin/adminModel');
require('dotenv').config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name', 'displayName', 'photos'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0]?.value;
        console.log('Facebook profile email:', email);

        let user = await Admin.findOne({ email });
        if (user) {
          user.role = 'admin';
          console.log('Admin user found:', user);
          return done(null, user);
        }

        user = await User.findOne({ email });
        if (user) {
          user.role = 'user';
          console.log('User found:', user);
          return done(null, user);
        }

        user = await Employee.findOne({ email });
        if (user) {
          user.role = 'employee';
          console.log('employee found:', user);
          return done(null, user);
        }

        console.log('User not found');
        return done(null, false, { message: 'User not found in any role' });
      } catch (err) {
        console.error('Error in Facebook Strategy:', err);
        return done(err, null);
      }
    }
  )
);
