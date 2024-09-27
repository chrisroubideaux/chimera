// meeting model.js
const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  googleId: String,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'senderModel',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'recipientModel',
    required: true,
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['Admin', 'Employee'],
  },
  recipientModel: {
    type: String,
    required: true,
    enum: ['Admin', 'Employee'],
  },

  meetingType: {
    type: String,
    default: null,
  },
  description: String,
  times: {
    type: String,
  },
  slot: {
    type: String,
  },
  slot2: {
    type: String,
  },
  slot3: {
    type: String,
  },
  slot4: {
    type: String,
  },
  slot5: {
    type: String,
  },
  slot6: {
    type: String,
  },
  slot7: {
    type: String,
  },
  days: {
    type: [String],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
