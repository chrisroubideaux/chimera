const express = require('express');
const session = require('express-session');
const { json, urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const passport = require('passport');
// auth routes
const employeeRoutes = require('./employees/employeeRoutes');
const adminRoutes = require('./admin/adminRoutes');
const messageRoutes = require('./messages/messageRoutes');
const userRoutes = require('./user/userRoutes');

require('dotenv').config(); // env config

const app = express();

const port = process.env.PORT || 3001;

const mongoURI = process.env.MONGO_URI;

// mongoose
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/', (req, res) => {
  res.send('Hello world!'); // Routes
});

app.use('/employees', employeeRoutes); // employee route

app.use('/admin', adminRoutes); // admin route

app.use('/message', messageRoutes); // message route

app.use('/user', userRoutes); // user route

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
