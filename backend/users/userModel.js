// user schema
const mongoose = require('mongoose');

const timeOffRequestSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  startDate: Date,
  endDate: Date,
  reason: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending',
  },
  requestDate: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    photo: String,
    email: String,
    password: String,
    facebookId: String,
    facebookDisplayName: String,
    facebookEmail: String,
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
    timeOffRequests: [timeOffRequestSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
