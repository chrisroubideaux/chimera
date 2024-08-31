// paper product routes
const express = require('express');
const PaperProduct = require('./paperProductModel');
const paperProductRoutes = express.Router();

const {
  createPaperProduct,
  getAllPaperProducts,
  getPaperProductById,
  updatePaperProductById,
  deletePaperProductById,
} = require('./paperProductController');

// Create a new item
paperProductRoutes.post('/', createPaperProduct);
// Get all items
paperProductRoutes.get('/', getAllPaperProducts);
// Get a single item by ID
paperProductRoutes.get('/:id', getPaperProductById);
// Update an existing item by ID
paperProductRoutes.put('/:id', updatePaperProductById);
// Delete an existing item by ID
paperProductRoutes.delete('/:id', deletePaperProductById);

module.exports = paperProductRoutes;
