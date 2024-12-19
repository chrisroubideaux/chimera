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
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let admin = await Admin.findOne({ googleId: profile.id });

        if (!admin) {
          const role =
            profile.emails[0].value === process.env.MAIN_ADMIN_EMAIL
              ? 'admin'
              : 'employee';

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
module.exports = passport;
