// messages routes
const express = require('express');
const messageRoutes = express.Router();

const {
  createMessage,
  getMessagesForUser,
  updateMessageStatus,
  deleteMessageById,
} = require('./messageController');

// Create a new message
messageRoutes.post('/', createMessage);

// Get all messages for user
messageRoutes.get('/', getMessagesForUser);

// Update/achive or mark as read
messageRoutes.put('/:id', updateMessageStatus);

// Delete an existing message by ID
messageRoutes.delete('/:id', deleteMessageById);

module.exports = messageRoutes;
