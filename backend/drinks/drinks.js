// drink routes
const express = require('express');
const Drink = require('./drinkModel');
const drinkRoutes = express.Router();

const {
  createDrink,
  getAllDrinks,
  getDrinkById,
  updateDrinkById,
  deleteDrinkById,
} = require('./drinkController');

// Create a new bev item
drinkRoutes.post('/', createDrink);
// Get all bev items
drinkRoutes.get('/', getAllDrinks);
// Get a single bev item by ID
drinkRoutes.get('/:id', getDrinkById);
// Update an existing bev by ID
drinkRoutes.put('/:id', updateDrinkById);
// Delete an existing bec by ID
drinkRoutes.delete('/:id', deleteDrinkById);

module.exports = drinkRoutes;
