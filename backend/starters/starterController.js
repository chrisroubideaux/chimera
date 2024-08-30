// starter controller
const mongoose = require('mongoose');
const Starter = require('./starterModel');

// Create a new starter
const createStarter = async (req, res) => {
  try {
    const starter = new Starter(req.body);
    await starter.save();
    res.status(201).json({ message: 'Product created successfully', starter });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Get all starters
const getAllStarters = async (req, res) => {
  try {
    const starters = await Starter.find();
    res.status(200).json(starters);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Get a single starter by ID
const getStarterById = async (req, res) => {
  try {
    const starter = await Starter.findById(req.params.id);
    if (!starter) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(starter);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};

// Update an existing starter by ID
const updateStarterById = async (req, res) => {
  try {
    const starter = await Starter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!starter) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', starter });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete an existing starter by ID
const deleteStarterById = async (req, res) => {
  try {
    const starter = await Starter.findByIdAndDelete(req.params.id);
    if (!starter) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  createStarter,
  getAllStarters,
  getStarterById,
  updateStarterById,
  deleteStarterById,
};
