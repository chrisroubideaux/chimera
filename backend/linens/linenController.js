// linen controller
const mongoose = require('mongoose');
const Linen = require('./linenModel');

// Create a new linen item
const createLinen = async (req, res) => {
  try {
    const linen = new Linen(req.body);
    await linen.save();
    res.status(201).json({ message: 'Product created successfully', linen });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Get all linen items
const getAllLinens = async (req, res) => {
  try {
    const linens = await Linen.find();
    res.status(200).json(linens);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Get a single linen item by ID
const getLinenById = async (req, res) => {
  try {
    const linen = await Linen.findById(req.params.id);
    if (!linen) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(linen);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};

// Update an existing linen item by ID
const updateLinenById = async (req, res) => {
  try {
    const linen = await Linen.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!linen) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', linen });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete an existing protein item by ID
const deleteLinenById = async (req, res) => {
  try {
    const linen = await Linen.findByIdAndDelete(req.params.id);
    if (!linen) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  createLinen,
  getAllLinens,
  getLinenById,
  updateLinenById,
  deleteLinenById,
};
