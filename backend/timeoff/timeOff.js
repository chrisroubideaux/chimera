// time off request routes
const express = require('express');

const {
  createTimeOffRequest,
  getAllTimeOffRequests,
  getTimeOffRequestById,
  updateTimeOffRequest,
  deleteTimeOffRequest,
} = require('./timeOffController');

const timeOffRoutes = express.Router();

// Create a time-off request
timeOffRoutes.post('/', createTimeOffRequest);

// Get all time-off requests
timeOffRoutes.get('/', getAllTimeOffRequests);

// Get a single time-off request by ID
timeOffRoutes.get('/:id', getTimeOffRequestById);

// Update a time-off request
timeOffRoutes.put('/:id', updateTimeOffRequest);

// Delete a time-off request
timeOffRoutes.delete('/:id', deleteTimeOffRequest);

module.exports = timeOffRoutes;
