// starters routes
const express = require('express');
const Starter = require('./starterModel');
const starterRoutes = express.Router();

const {
  createStarter,
  getAllStarters,
  getStarterById,
  updateStarterById,
  deleteStarterById,
} = require('./starterController');

// Create a new starters
starterRoutes.post('/', createStarter);
// Get all starters
starterRoutes.get('/', getAllStarters);
// Get a single starter by ID
starterRoutes.get('/:id', getStarterById);
// Update an existing starter by ID
starterRoutes.put('/:id', updateStarterById);
// Delete an existing starter by ID
starterRoutes.delete('/:id', deleteStarterById);

module.exports = starterRoutes;
