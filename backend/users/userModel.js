// user schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    photo: String,
    email: String,
    role: String,
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
    emergencyContact1: String,
    emergencyContact2: String,
    role: {
      type: String,
      enum: ['admin', 'employee'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
