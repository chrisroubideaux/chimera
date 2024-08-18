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

const adminSchema = new mongoose.Schema({
  name: String,
  image: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  empId: String,
  socialSec: String,
  hireDate: Date,
  wage: Number,
  emergencyContacts: [
    {
      name: String,
      phone: String,
    },
  ],
  timeOffRequests: [timeOffRequestSchema],
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

{
  /*

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  image: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  empId: String,
  socialSec: String,
  hireDate: Date,
  wage: Number,
  emergencyContacts: [
    {
      name: String,
      phone: String,
    },
  ],
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

*/
}
