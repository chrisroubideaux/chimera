// entrees routes
const express = require('express');
const Entree = require('./EntreeModel');
const entreeRoutes = express.Router();

const {
  createEntree,
  getAllEntrees,
  getEntreeById,
  updateEntreeById,
  deleteEntreeById,
} = require('./entreeController');

// Create a new entree
entreeRoutes.post('/', createEntree);
// Get all entrees
entreeRoutes.get('/', getAllEntrees);
// Get a single entree by ID
entreeRoutes.get('/:id', getEntreeById);
// Update an existing entree by ID
entreeRoutes.put('/:id', updateEntreeById);
// Delete an existing entree by ID
entreeRoutes.delete('/:id', deleteEntreeById);

module.exports = entreeRoutes;
