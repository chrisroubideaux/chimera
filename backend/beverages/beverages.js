// beverage routes
const express = require('express');
const Beverage = require('./beverageModel');
const beverageRoutes = express.Router();

const {
  createBeverage,
  getAllBeverages,
  getBeverageById,
  updateBeverageById,
  deleteBeverageById,
} = require('./beverageController');

// Create a new bev
beverageRoutes.post('/', createBeverage);
// Get all bevs
beverageRoutes.get('/', getAllBeverages);
// Get a single bev by ID
beverageRoutes.get('/:id', getBeverageById);
// Update an existing bev by ID
beverageRoutes.put('/:id', updateBeverageById);
// Delete an existing bev by ID
beverageRoutes.delete('/:id', deleteBeverageById);

module.exports = beverageRoutes;
