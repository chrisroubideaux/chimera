// produce routes
const express = require('express');
const Produce = require('./produceModel');
const produceRoutes = express.Router();

const {
  createProduce,
  getAllProduce,
  getProduceById,
  updateProduceById,
  deleteProduceById,
} = require('./produceController');

// Create a new produce item
produceRoutes.post('/', createProduce);
// Get all produce itmes
produceRoutes.get('/', getAllProduce);
// Get a single produce item by ID
produceRoutes.get('/:id', getProduceById);
// Update an existing produce item by ID
produceRoutes.put('/:id', updateProduceById);
// Delete an existing starter by ID
produceRoutes.delete('/:id', deleteProduceById);

module.exports = produceRoutes;
