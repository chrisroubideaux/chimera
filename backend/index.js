// Main index.js
const express = require('express');
const session = require('express-session');
const { json, urlencoded } = require('body-parser');
const mongoose = require('mongoose');
//const jwt = require('jsonwebtoken');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const passport = require('passport');

// auth routes
const employeeRoutes = require('./employees/employeeRoutes');
const adminRoutes = require('./admin/adminRoutes');
const messageRoutes = require('./messages/messageRoutes');
const userRoutes = require('./users/userRoutes');
const authRoutes = require('./routes/auth');

require('dotenv').config(); // env config

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
    origin: process.env.CLIENT_ORIGIN, // Allow requests only from this origin
    credentials: true, // Allow cookies and authentication headers to be sent
  })
);
// Session setup with connect-mongo
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret for session encryption
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoURI }), // Use connect-mongo for session store
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Session expiry time (1 day)
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
// api routes
app.use('/employees', employeeRoutes);
app.use('/admin', adminRoutes);
app.use('/message', messageRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
