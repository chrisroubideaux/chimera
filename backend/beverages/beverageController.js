// bev controller
const mongoose = require('mongoose');
const Beverage = require('./beverageModel');

// Create a new bev
const createBeverage = async (req, res) => {
  try {
    const beverage = new Beverage(req.body);
    await beverage.save();
    res.status(201).json({ message: 'Product created successfully', beverage });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Get all bevs
const getAllBeverages = async (req, res) => {
  try {
    const beverages = await Beverage.find();
    res.status(200).json(beverages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Get a single bev by ID
const getBeverageById = async (req, res) => {
  try {
    const beverage = await Beverage.findById(req.params.id);
    if (!beverage) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(beverage);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};

// Update an existing bev by ID
const updateBeverageById = async (req, res) => {
  try {
    const beverage = await Beverage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!beverage) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', beverage });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete an existing bev by ID
const deleteBeverageById = async (req, res) => {
  try {
    const beverage = await Beverage.findByIdAndDelete(req.params.id);
    if (!beverage) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  createBeverage,
  getAllBeverages,
  getBeverageById,
  updateBeverageById,
  deleteBeverageById,
};
