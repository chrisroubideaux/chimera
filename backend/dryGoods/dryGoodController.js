// dry goods controller
const mongoose = require('mongoose');
const DryGood = require('./dryGoodModel');

// Create a new item
const createDryGood = async (req, res) => {
  try {
    const dryGood = new DryGood(req.body);
    await dryGood.save();
    res.status(201).json({ message: 'Product created successfully', dryGood });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Get all items
const getAllDryGoods = async (req, res) => {
  try {
    const dryGoods = await DryGood.find();
    res.status(200).json(dryGoods);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Get a single item by ID
const getDryGoodById = async (req, res) => {
  try {
    const dryGood = await DryGood.findById(req.params.id);
    if (!dryGood) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(dryGood);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};

// Update an existing item by ID
const updateDryGoodById = async (req, res) => {
  try {
    const dryGood = await DryGood.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!dryGood) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', dryGood });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete an existing item by ID
const deleteDryGoodById = async (req, res) => {
  try {
    const dryGood = await DryGood.findByIdAndDelete(req.params.id);
    if (!dryGood) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  createDryGood,
  getAllDryGoods,
  getDryGoodById,
  updateDryGoodById,
  deleteDryGoodById,
};
