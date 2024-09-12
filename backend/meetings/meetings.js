// meetings routes
const express = require('express');
const meetingRoutes = express.Router();

const {
  createMeeting,
  getAllMeetings,
  getMeetingsForUser,
  updateMeeting,
  deleteMeeting,
} = require('./meetingController');

// Create a new meeting
meetingRoutes.post('/', createMeeting);
// Get all meetings
meetingRoutes.get('/', getAllMeetings);
// Get meetings for a specific user
meetingRoutes.get('/user/:userId', getMeetingsForUser);
// Update a meeting
meetingRoutes.put('/:id', updateMeeting);
// Delete a meeting
meetingRoutes.delete('/:id', deleteMeeting);

module.exports = meetingRoutes;
