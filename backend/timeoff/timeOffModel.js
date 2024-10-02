// time off request schema
const mongoose = require('mongoose');

const timeOffSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    empId: {
      type: String,
      required: true,
    },
    requestType: {
      type: String,
      enum: ['Vacation', 'P.T.O', 'Personal'],
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const TimeOff = mongoose.model('TimeOff', timeOffSchema);

module.exports = TimeOff;

{
  /*
const mongoose = require('mongoose');

const timeOffSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    email: String,
    phone: String,
    empId: String,
    fromDate: String,
    toDate: String,
    requestType: [],
  },
  {
    timestamps: true,
  }
);

const TimeOff = mongoose.model('TimeOff', timeOffSchema);

module.exports = TimeOff;

*/
}
