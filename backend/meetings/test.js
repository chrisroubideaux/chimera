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
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // Could be stored as "HH:mm"
    required: true,
  },
  isVideo: {
    type: Boolean,
    default: false,
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
    type: String,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
