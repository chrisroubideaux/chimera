// dry goods routes
const express = require('express');
const DryGood = require('./dryGoodModel');
const dryGoodRoutes = express.Router();

const {
  createDryGood,
  getAllDryGoods,
  getDryGoodById,
  updateDryGoodById,
  deleteDryGoodById,
} = require('./dryGoodController');

// Create a new item
dryGoodRoutes.post('/', createDryGood);
// Get all items
dryGoodRoutes.get('/', getAllDryGoods);
// Get a single item by ID
dryGoodRoutes.get('/:id', getDryGoodById);
// Update an existing item by ID
dryGoodRoutes.put('/:id', updateDryGoodById);
// Delete an existing item by ID
dryGoodRoutes.delete('/:id', deleteDryGoodById);

module.exports = dryGoodRoutes;
