// google passprot
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Admin = require('../admin/adminModel');
const dotenv = require('dotenv');

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists
        let admin = await Admin.findOne({ googleId: profile.id });

        if (!admin) {
          // Determine the role (main admin or employee)
          const role =
            profile.emails[0].value === process.env.MAIN_ADMIN_EMAIL
              ? 'admin'
              : 'employee';

          // Create a new user if they don't exist
          admin = new Admin({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            role: profile.displayRole,
          });

          await admin.save();
        }

        done(null, admin);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
passport.serializeUser((admin, done) => {
  done(null, admin._id); // Use _id here
});

passport.deserializeUser(async (_id, done) => {
  try {
    const admin = await Admin.findById(_id); // Use _id here
    done(null, admin);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
