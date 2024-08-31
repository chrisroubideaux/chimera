// dairy controller
const mongoose = require('mongoose');
const Dairy = require('./dairyModel');

// Create a new dairy item
const createDairy = async (req, res) => {
  try {
    const dairy = new Dairy(req.body);
    await dairy.save();
    res.status(201).json({ message: 'Product created successfully', dairy });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Get all dairy items
const getAllDairy = async (req, res) => {
  try {
    const dairy = await Dairy.find();
    res.status(200).json(dairy);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Get a single dairy item by ID
const getDairyById = async (req, res) => {
  try {
    const dairy = await Dairy.findById(req.params.id);
    if (!dairy) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(dairy);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};

// Update an existing dairy by ID
const updateDairyById = async (req, res) => {
  try {
    const dairy = await Dairy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!dairy) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', dairy });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete an existing dairy by ID
const deleteDairyById = async (req, res) => {
  try {
    const dairy = await Dairy.findByIdAndDelete(req.params.id);
    if (!dairy) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  createDairy,
  getAllDairy,
  getDairyById,
  updateDairyById,
  deleteDairyById,
};
