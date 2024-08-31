// product controller
const mongoose = require('mongoose');
const PaperProduct = require('./paperProductModel');

// Create a new item
const createPaperProduct = async (req, res) => {
  try {
    const paperProduct = new PaperProduct(req.body);
    await paperProduct.save();
    res
      .status(201)
      .json({ message: 'Product created successfully', paperProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Get all items
const getAllPaperProducts = async (req, res) => {
  try {
    const paperProducts = await PaperProduct.find();
    res.status(200).json(paperProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Get a single item by ID
const getPaperProductById = async (req, res) => {
  try {
    const paperProduct = await PaperProduct.findById(req.params.id);
    if (!paperProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(paperProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};

// Update an existing item by ID
const updatePaperProductById = async (req, res) => {
  try {
    const paperProduct = await PaperProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!paperProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res
      .status(200)
      .json({ message: 'Product updated successfully', paperProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete an existing item by ID
const deletePaperProductById = async (req, res) => {
  try {
    const paperProduct = await PaperProduct.findByIdAndDelete(req.params.id);
    if (!paperProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  createPaperProduct,
  getAllPaperProducts,
  getPaperProductById,
  updatePaperProductById,
  deletePaperProductById,
};
