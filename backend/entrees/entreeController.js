// entree controller
const mongoose = require('mongoose');
const Entree = require('./entree');

// Create a new starter
const createEntree = async (req, res) => {
  try {
    const entree = new Entree(req.body);
    await entree.save();
    res.status(201).json({ message: 'Product created successfully', entree });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Get all entrees
const getAllEntrees = async (req, res) => {
  try {
    const entrees = await Entree.find();
    res.status(200).json(entrees);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Get a single entree by ID
const getEntreeById = async (req, res) => {
  try {
    const entree = await Entree.findById(req.params.id);
    if (!entree) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(entree);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};

// Update an existing starter by ID
const updateEntreeById = async (req, res) => {
  try {
    const entree = await Entree.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!entree) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', entree });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete an existing entree by ID
const deleteEntreeById = async (req, res) => {
  try {
    const entree = await Entree.findByIdAndDelete(req.params.id);
    if (!entree) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  createEntree,
  getAllEntrees,
  getEntreeById,
  updateEntreeById,
  deleteEntreeById,
};
