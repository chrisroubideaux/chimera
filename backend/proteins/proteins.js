// protien routes
const express = require('express');
const Protein = require('./proteinModel');
const proteinRoutes = express.Router();

const {
  createProtein,
  getAllProteins,
  getProteinById,
  updateProteinById,
  deleteProteinById,
} = require('./proteinController');

// Create a new proteins
proteinRoutes.post('/', createProtein);
// Get all protein items
proteinRoutes.get('/', getAllProteins);
// Get a single protein item by ID
proteinRoutes.get('/:id', getProteinById);
// Update an existing protein by ID
proteinRoutes.put('/:id', updateProteinById);
// Delete an existing protein by ID
proteinRoutes.delete('/:id', deleteProteinById);

module.exports = proteinRoutes;
