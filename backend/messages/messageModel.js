// messages schema
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
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
  messageContent: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  flagged: {
    type: Boolean,
    default: false,
  },
  parentMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
});
// Virtual for sender's name
messageSchema.virtual('senderName').get(function () {
  return this.senderModel === 'Admin' ? this._senderName : this._senderName;
});

// Virtual for recipient's name
messageSchema.virtual('recipientName').get(function () {
  return this.recipientModel === 'Admin'
    ? this._recipientName
    : this._recipientName;
});

// Ensure virtuals are serialized
messageSchema.set('toObject', { virtuals: true });
messageSchema.set('toJSON', { virtuals: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

{
  /*
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
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
  messageContent: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
*/
}
