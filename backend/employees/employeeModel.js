// employee schema
const mongoose = require('mongoose');

const timeOffRequestSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  reason: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending',
  },
});

const employeeSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    image: String,
    email: String,
    role: String,
    title: String,
    dept: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    empId: String,
    socialSec: String,
    bankName: String,
    accNumber: String,
    directDeposit: String,
    hours: String,
    breaks: String,
    overtime: String,
    hireDate: String,
    endDate: String,
    lastShift: String,
    nextShift: String,
    wage: String,
    emergencyContact1: String,
    emergencyContact2: String,
    timeOffRequests: [timeOffRequestSchema],
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
