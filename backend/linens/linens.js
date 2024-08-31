// linen routes
const express = require('express');
const Linen = require('./linenModel');
const linenRoutes = express.Router();

const {
  createLinen,
  getAllLinens,
  getLinenById,
  updateLinenById,
  deleteLinenById,
} = require('./linenController');

// Create a new linen item
linenRoutes.post('/', createLinen);
// Get all linen items
linenRoutes.get('/', getAllLinens);
// Get a single linen item by ID
linenRoutes.get('/:id', getLinenById);
// Update an existing linen by ID
linenRoutes.put('/:id', updateLinenById);
// Delete an existing linen by ID
linenRoutes.delete('/:id', deleteLinenById);

module.exports = linenRoutes;
