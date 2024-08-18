// messages schema
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  flagged: { type: Boolean, default: false }, // Field for flagging messages
});

const Message = mongoose.model('Message', messageSchema);

// Function to create a new message
const createMessage = async (senderId, receiverId, content) => {
  // Check if the content contains profanity
  const isProfane = filter.isProfane(content);

  // Create a new message with filtered content and flag if profane
  const newMessage = new Message({
    sender: senderId,
    receiver: receiverId,
    content: filter.clean(content),
    flagged: isProfane,
  });

  // Save the message to the database
  await newMessage.save();
  console.log('Message sent!');
};

// Example usage
createMessage(
  'senderUserId',
  'receiverUserId',
  'Hello, this is a test message with some bad words.'
);
