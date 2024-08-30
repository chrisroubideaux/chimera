// products route
const express = require('express');
const Product = require('./productModel');
const productRoutes = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('./productController');

// Create a new product
productRoutes.post('/', createProduct);
// Get all products
productRoutes.get('/', getAllProducts);
// Get a single product by ID
productRoutes.get('/:id', getProductById);
// Update an existing product by ID
productRoutes.put('/:id', updateProductById);
// Delete an existing product by ID
productRoutes.delete('/:id', deleteProductById);

module.exports = productRoutes;
