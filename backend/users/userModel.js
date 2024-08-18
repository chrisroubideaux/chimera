// user schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  empId: String,
  socialSec: String,
  hireDate: Date,
  endDate: Date,
  isEmployed: {
    type: Boolean,
    default: true,
  },
  wage: Number,
  emergencyContacts: [
    {
      name: String,
      phone: String,
    },
  ],
  role: {
    type: String,
    enum: ['admin', 'employee'],
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
