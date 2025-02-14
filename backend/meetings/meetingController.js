// meeting controller
const mongoose = require('mongoose');
const Meeting = require('./meetingModel');
const Admin = require('../admin/adminModel');
const Employee = require('../employees/employeeModel');
const User = require('../users/userModel');

// Function to create a new meeting
const createMeeting = async (req, res) => {
  try {
    const {
      senderId,
      senderModel,
      recipientIds,
      recipientModel,
      date,
      time,
      isVideo,
      description,
      times,
      slot,
      slot2,
      slot3,
      slot4,
      slot5,
      slot6,
      slot7,
      days,
    } = req.body;

    console.log('Request Body:', req.body);

    // Validate sender
    let SenderModel;
    if (senderModel === 'Admin') {
      SenderModel = Admin;
    } else if (senderModel === 'Employee') {
      SenderModel = Employee;
    } else if (senderModel === 'User') {
      SenderModel = User;
    } else {
      return res.status(400).json({ error: 'Invalid sender model' });
    }

    const senderDoc = await SenderModel.findById(senderId);
    console.log('SenderDoc:', senderDoc);
    if (!senderDoc) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    // Validate recipients
    let RecipientModel;
    if (recipientModel === 'Admin') {
      RecipientModel = Admin;
    } else if (recipientModel === 'Employee') {
      RecipientModel = Employee;
    } else if (recipientModel === 'User') {
      RecipientModel = User;
    } else {
      return res.status(400).json({ error: 'Invalid recipient model' });
    }

    const recipientDocs = await RecipientModel.find({
      _id: { $in: recipientIds },
    });
    console.log('RecipientDocs:', recipientDocs);
    if (recipientDocs.length !== recipientIds.length) {
      return res
        .status(404)
        .json({ error: 'One or more recipients not found' });
    }

    // Create new meeting
    const newMeeting = new Meeting({
      sender: senderId,
      senderModel,
      recipient: recipientIds,
      recipientModel,
      date,
      time,
      isVideo,
      description,
      times,
      slot,
      slot2,
      slot3,
      slot4,
      slot5,
      slot6,
      slot7,
      days,
    });

    // Save the meeting
    const savedMeeting = await newMeeting.save();

    res.status(201).json(savedMeeting);
  } catch (err) {
    console.error('Error in createMeeting:', err);
    res.status(500).json({ error: err.message });
  }
};

// Function to get all meetings
const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({})
      .populate('sender', 'name')
      .populate('recipient', 'name');

    res.status(200).json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to get meetings for a specific user
const getMeetingsForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const meetings = await Meeting.find({
      $or: [{ sender: userId }, { recipient: { $in: [userId] } }],
    })
      .populate('sender', 'name')
      .populate('recipient', 'name');

    res.status(200).json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to update a meeting
const updateMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id;
    const updateData = req.body;

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meetingId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedMeeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.status(200).json(updatedMeeting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to delete a meeting
const deleteMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id;

    const deletedMeeting = await Meeting.findByIdAndDelete(meetingId);

    if (!deletedMeeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMeeting,
  getAllMeetings,
  getMeetingsForUser,
  updateMeeting,
  deleteMeeting,
};

{
  /*
const mongoose = require('mongoose');
const Meeting = require('./meetingModel');
const Admin = require('../admin/adminModel');
const Employee = require('../employees/employeeModel');

// Function to create a new meeting
const createMeeting = async (req, res) => {
  try {
    const {
      senderId,
      senderModel,
      recipientIds,
      recipientModel,
      date,
      time,
      isVideo,
      description,
      times,
      slot,
      slot2,
      slot3,
      slot4,
      slot5,
      slot6,
      slot7,
      days,
    } = req.body;

    console.log('Request Body:', req.body);

    // Validate sender
    const SenderModel = senderModel === 'Admin' ? Admin : Employee;
    const senderDoc = await SenderModel.findById(senderId);
    console.log('SenderDoc:', senderDoc);
    if (!senderDoc) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    // Validate recipients
    const RecipientModel = recipientModel === 'Admin' ? Admin : Employee;
    const recipientDocs = await RecipientModel.find({
      _id: { $in: recipientIds },
    });
    console.log('RecipientDocs:', recipientDocs);
    if (recipientDocs.length !== recipientIds.length) {
      return res
        .status(404)
        .json({ error: 'One or more recipients not found' });
    }

    // Create new meeting
    const newMeeting = new Meeting({
      sender: senderId,
      senderModel,
      recipient: recipientIds,
      recipientModel,
      date,
      time,
      isVideo,
      description,
      times,
      slot,
      slot2,
      slot3,
      slot4,
      slot5,
      slot6,
      slot7,
      days,
    });

    // Save the meeting
    const savedMeeting = await newMeeting.save();

    res.status(201).json(savedMeeting);
  } catch (err) {
    console.error('Error in createMeeting:', err);
    res.status(500).json({ error: err.message });
  }
};

// Function to get all meetings
const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({})
      .populate('sender', 'name')
      .populate('recipient', 'name');

    res.status(200).json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to get meetings for a specific user
const getMeetingsForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const meetings = await Meeting.find({
      $or: [{ sender: userId }, { recipient: { $in: [userId] } }],
    })
      .populate('sender', 'name')
      .populate('recipient', 'name');

    res.status(200).json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to update a meeting
const updateMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id;
    const updateData = req.body;

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meetingId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedMeeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.status(200).json(updatedMeeting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to delete a meeting
const deleteMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id;

    const deletedMeeting = await Meeting.findByIdAndDelete(meetingId); // Use findByIdAndDelete instead

    if (!deletedMeeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMeeting,
  getAllMeetings,
  getMeetingsForUser,
  updateMeeting,
  deleteMeeting,
};
*/
}
