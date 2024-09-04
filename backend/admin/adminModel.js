// admin model
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

const adminSchema = new mongoose.Schema(
  {
    googleId: String,
    firstName: String,
    LastName: String,
    image: String,
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
    wage: Number,
    emergencyContact1: String,
    emergencyContact2: String,
    timeOffRequests: [timeOffRequestSchema],
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
