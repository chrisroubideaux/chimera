// messages controller
const mongoose = require('mongoose');
const Message = require('./messageModel');
const Admin = require('../admin/adminModel');
const Employee = require('../employees/employeeModel');

// Function to create a new message
const createMessage = async (req, res) => {
  try {
    const {
      sender,
      recipient,
      senderModel,
      recipientModel,
      messageContent,
      parentMessage,
    } = req.body;

    // Determine the models based on sender and recipient types
    const SenderModel = senderModel === 'Admin' ? Admin : Employee;
    const RecipientModel = recipientModel === 'Admin' ? Admin : Employee;

    // Fetch sender and recipient documents
    const senderDoc = await SenderModel.findById(sender);
    const recipientDoc = await RecipientModel.findById(recipient);

    // Check if sender and recipient documents exist
    if (!senderDoc || !recipientDoc) {
      return res.status(404).json({ error: 'Sender or recipient not found' });
    }

    // Create new message
    const newMessage = new Message({
      sender,
      recipient,
      senderModel,
      recipientModel,
      messageContent,
      timestamp: Date.now(),
      flagged: false,
      parentMessage,
    });

    // Save the message
    const savedMessage = await newMessage.save();

    // Prepare response with names
    const response = {
      _id: savedMessage._id,
      sender: savedMessage.sender,
      recipient: savedMessage.recipient,
      senderModel: savedMessage.senderModel,
      recipientModel: savedMessage.recipientModel,
      senderName: senderDoc.name, // Ensure sender's name is included
      recipientName: recipientDoc.name, // Ensure recipient's name is included
      messageContent: savedMessage.messageContent,
      timestamp: savedMessage.timestamp,
      flagged: savedMessage.flagged,
      parentMessage: savedMessage.parentMessage,
    };

    res.status(201).json(response);
  } catch (err) {
    console.error('Error in createMessage:', err);
    res.status(500).json({ error: err.message });
  }
};

{
  /*
const createMessage = async (req, res) => {
  try {
    const {
      sender,
      recipient,
      senderModel,
      recipientModel,
      messageContent,
      parentMessage,
    } = req.body;

    const SenderModel = senderModel === 'Admin' ? Admin : Employee;
    const RecipientModel = recipientModel === 'Admin' ? Admin : Employee;

    const senderDoc = await SenderModel.findById(sender);
    const recipientDoc = await RecipientModel.findById(recipient);

    if (!senderDoc || !recipientDoc) {
      return res.status(404).json({ error: 'Sender or recipient not found' });
    }

    const newMessage = new Message({
      sender,
      recipient,
      senderModel,
      recipientModel,
      messageContent,
      timestamp: Date.now(),
      flagged: false,
      parentMessage,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
}
// Get all messages
const getAllMessages = async (req, res) => {
  try {
    // Fetch all messages
    const messages = await Message.find({})
      .populate('sender', 'name')
      .populate('recipient', 'name')
      .populate('parentMessage'); // Populate parent message for replies

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get messages for user
const getMessagesForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch messages with sender and recipient populated
    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }],
    })
      .populate({
        path: 'sender',
        select: 'name',
        model: function () {
          return this.senderModel;
        },
      })
      .populate({
        path: 'recipient',
        select: 'name',
        model: function () {
          return this.recipientModel;
        },
      })
      .populate('parentMessage'); // Populate parent message for replies

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

{
  /*
const getMessagesForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if `userId` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Convert the string `userId` to a MongoDB ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    // Fetch messages where the user is either the sender or recipient
    const messages = await Message.find({
      $or: [{ sender: objectId }, { recipient: objectId }],
    })
      .populate('sender', 'name')
      .populate('recipient', 'name')
      .populate('parentMessage'); // Populate parent message for replies

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
}
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
// Delete message by id
const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      console.error('Invalid ObjectId:', messageId);
      return res.status(400).json({ error: 'Invalid Message ID' });
    }

    console.log('Attempting to delete message with ID:', messageId);

    const deletedMessage = await Message.findOneAndDelete({ _id: messageId });

    if (!deletedMessage) {
      console.log('Message not found for ID:', messageId);
      return res.status(404).json({ error: 'Message not found' });
    }

    console.log('Message deleted successfully:', deletedMessage);

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error('Error deleting message:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessagesForUser,
  updateMessageStatus,
  deleteMessage,
};

{
  /*
// messages controller
const Message = require('./messageModel');
const Admin = require('../admin/adminModel');
const Employee = require('../employees/employeeModel');

// Function to create a new message
const createMessage = async (req, res) => {
  try {
    const { sender, recipient, senderModel, recipientModel, messageContent } =
      req.body;

    // Determine the models to use based on the senderModel and recipientModel
    const SenderModel = senderModel === 'Admin' ? Admin : Employee;
    const RecipientModel = recipientModel === 'Admin' ? Admin : Employee;

    // Fetch sender and recipient from the appropriate models
    const senderDoc = await SenderModel.findById(sender);
    const recipientDoc = await RecipientModel.findById(recipient);

    if (!senderDoc || !recipientDoc) {
      return res.status(404).json({ error: 'Sender or recipient not found' });
    }

    // Create a new message without profanity filtering
    const newMessage = new Message({
      sender,
      recipient,
      senderModel,
      recipientModel,
      messageContent,
      timestamp: Date.now(),
      flagged: false, // Set flagged to false since we are not checking for profanity
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
      $or: [{ sender: userId }, { recipient: userId }],
    })
      .populate('sender', 'name')
      .populate('recipient', 'name');
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


*/
}
