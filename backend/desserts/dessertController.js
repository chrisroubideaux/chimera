// dessert controller
const mongoose = require('mongoose');
const Dessert = require('./dessertModel');

// Create a new dessert
const createDessert = async (req, res) => {
  try {
    const dessert = new Dessert(req.body);
    await dessert.save();
    res.status(201).json({ message: 'Product created successfully', dessert });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Get all desserts
const getAllDesserts = async (req, res) => {
  try {
    const desserts = await Dessert.find();
    res.status(200).json(desserts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Get a single dessert by ID
const getDessertById = async (req, res) => {
  try {
    const dessert = await Dessert.findById(req.params.id);
    if (!dessert) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(dessert);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};

// Update an existing dessert by ID
const updateDessertById = async (req, res) => {
  try {
    const dessert = await Dessert.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!dessert) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', dessert });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete an existing dessert by ID
const deleteDessertById = async (req, res) => {
  try {
    const dessert = await Dessert.findByIdAndDelete(req.params.id);
    if (!dessert) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  createDessert,
  getAllDesserts,
  getDessertById,
  updateDessertById,
  deleteDessertById,
};
