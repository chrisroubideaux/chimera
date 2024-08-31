// Main index.js
const express = require('express');
const session = require('express-session');
const { json, urlencoded } = require('body-parser');
const mongoose = require('mongoose');
//const jwt = require('jsonwebtoken');
const MongoStore = require('connect-mongo');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const passport = require('passport');

// auth routes
//const employeeRoutes = require('./employees/employeeRoutes');
const adminRoutes = require('./admin/admins');
const messageRoutes = require('./messages/messageRoutes');
const userRoutes = require('./users/userRoutes');
const authRoutes = require('./routes/auth');
const starterRoutes = require('./starters/starters');
const entreeRoutes = require('./entrees/entrees');
const dessertRoutes = require('./desserts/desserts');
const beverageRoutes = require('./beverages/beverages');
// inventory routes
const produceRoutes = require('./produce/produce');
const dairyRoutes = require('./dairy/dairy');
const proteinRoutes = require('./proteins/proteins');
const drinkRoutes = require('./drinks/drinks');
const linenRoutes = require('./linens/linens');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;

// mongoose

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

{
  /*
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

*/
}
// CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);
// Session setup with connect-mongo
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoURI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Body parsing middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// routes
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// routes
app.use('/products', (req, res) => {
  res.send('Hello world!');
});
// api routes
//app.use('/employees', employeeRoutes);
app.use('/admins', adminRoutes);
app.use('/starters', starterRoutes);
app.use('/entrees', entreeRoutes);
app.use('/desserts', dessertRoutes);
app.use('/beverages', beverageRoutes);
app.use('/produce', produceRoutes);
app.use('/dairy', dairyRoutes);
app.use('/proteins', proteinRoutes);
app.use('/linens', linenRoutes);
app.use('/drinks', drinkRoutes);
app.use('/message', messageRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.get('/admins/:id', (req, res) => {
  const { id } = req.params;
  Admin.findById(id)
    .then((admin) => {
      if (admin) {
        res.json(admin);
      } else {
        res.status(404).send('Admin not found');
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Oauth
app.get(
  '/auth/google/register',
  passport.authenticate('google', { scope: ['openid', 'profile', 'email'] })
);

// Google OAuth login route
app.get(
  '/auth/google/login',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`http://localhost:3000/admins/${userId}`);
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
