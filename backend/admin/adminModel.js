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
    name: String,
    image: String,
    email: String,
    role: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    empId: String,
    socialSec: String,
    hireDate: String,
    endDate: String,
    wage: String,
    emergencyContact1: String,
    emergencyName: String,
    emergencyContact2: String,
    emergencyName2: String,
    timeOffRequests: [timeOffRequestSchema],
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
