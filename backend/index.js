// Main index.js
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const express = require('express');
const session = require('express-session');
const { json, urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const MongoStore = require('connect-mongo');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const passport = require('passport');
// auth routes
const employeeRoutes = require('./employees/employees');
const adminRoutes = require('./admin/admins');
const messageRoutes = require('./messages/messages');
const meetingRoutes = require('./meetings/meetings');
const timeOffRoutes = require('./timeoff/timeOff');
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
const dryGoodRoutes = require('./dryGoods/dryGoods');
const paperProductRoutes = require('./paperProducts/paperProducts');

require('./routes/facebookConfig');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;

// mongoose connection
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
  .connect(mongoURI)
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
    origin: process.env.CLIENT_BASE_URL || 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

// Session setup with connect-mongo

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
});

app.use(sessionMiddleware);

// Body parsing middleware
app.use(json());
app.use(urlencoded({ extended: true }));
// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Verify Token middleware function
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: 'Authentication token is missing' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = decoded._id;
    console.log('Token Verified, User ID:', req.userId);
    next();
  });
}

// Routes
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Products route
app.use('/products', (req, res) => {
  res.send('Hello world!');
});

// API routes
app.use('/employees', employeeRoutes);
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
app.use('/dryGoods', dryGoodRoutes);
app.use('/paperProducts', paperProductRoutes);
app.use('/messages', messageRoutes);
app.use('/meetings', meetingRoutes);
app.use('/timeOff', timeOffRoutes);
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

// OAuth routes
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

// Facebook OAuth registration route
app.get(
  '/auth/facebook/register',
  passport.authenticate('facebook', { scope: ['email'] })
);

// Facebook OAuth callback route (Updated to handle dynamic redirect)
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Authenticated user:', req.user);
    if (req.user) {
      const { role, id } = req.user;

      if (role === 'admin') {
        res.redirect(`https://chimera-green.vercel.app/admins/${id}`);
      } else if (role === 'agent') {
        res.redirect(`https://chimera-green.vercel.app/employees/${id}`);
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

app.get(
  '/auth/facebook/login',
  passport.authenticate('facebook', { scope: ['email'] })
);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
