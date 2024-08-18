// messages controller
const Message = require('./messageModel');
const User = require('./userModel'); // Assuming you have a User model
const Filter = require('bad-words');
const filter = new Filter();

// Function to create a new message
const createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    // Fetch sender and receiver from the database
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

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
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to get all messages for a user
const getMessagesForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate('sender', 'name')
      .populate('receiver', 'name');
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to update message status (read/archived)
const updateMessageStatus = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { read, archived } = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { read, archived },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to delete a message
const deleteMessageById = async (req, res) => {
  try {
    const { messageId } = req.params;

    const deletedMessage = await Message.findByIdAndRemove(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMessage,
  getMessagesForUser,
  updateMessageStatus,
  deleteMessageById,
};
