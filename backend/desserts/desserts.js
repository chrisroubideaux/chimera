// desserts routes
const express = require('express');
const Dessert = require('./dessertModel');
const dessertRoutes = express.Router();

const {
  createDessert,
  getAllDesserts,
  getDessertById,
  updateDessertById,
  deleteDessertById,
} = require('./dessertController');

// Create a new dessert
dessertRoutes.post('/', createDessert);
// Get all desserts
dessertRoutes.get('/', getAllDesserts);
// Get a single dessert by ID
dessertRoutes.get('/:id', getDessertById);
// Update an existing dessert by ID
dessertRoutes.put('/:id', updateDessertById);
// Delete an existing dessert by ID
dessertRoutes.delete('/:id', deleteDessertById);

module.exports = dessertRoutes;
