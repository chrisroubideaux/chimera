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

const employeeSchema = new mongoose.Schema({
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
  timeOffRequests: [timeOffRequestSchema], // New field for time off requests
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

{
  /*
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
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
});

const Employee = mongoose.model('Employee', employeeSchema);

*/
}

module.exports = Employee;
