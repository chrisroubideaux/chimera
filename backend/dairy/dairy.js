// dairy routes
const express = require('express');
const Dairy = require('./dairyModel');
const dairyRoutes = express.Router();

const {
  createDairy,
  getAllDairy,
  getDairyById,
  updateDairyById,
  deleteDairyById,
} = require('./dairyController');

// Create a new dairy item
dairyRoutes.post('/', createDairy);
// Get all dairy itmes
dairyRoutes.get('/', getAllDairy);
// Get a single dairy item by ID
dairyRoutes.get('/:id', getDairyById);
// Update an existing diary item by ID
dairyRoutes.put('/:id', updateDairyById);
// Delete an existing dairy item by ID
dairyRoutes.delete('/:id', deleteDairyById);

module.exports = dairyRoutes;
