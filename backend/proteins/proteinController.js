// protein controller
const mongoose = require('mongoose');
const Protein = require('./proteinModel');

// Create a new protein item
const createProtein = async (req, res) => {
  try {
    const protein = new Protein(req.body);
    await protein.save();
    res.status(201).json({ message: 'Product created successfully', protein });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Get all protein items
const getAllProteins = async (req, res) => {
  try {
    const proteins = await Protein.find();
    res.status(200).json(proteins);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Get a single protein item by ID
const getProteinById = async (req, res) => {
  try {
    const protein = await Protein.findById(req.params.id);
    if (!protein) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(protein);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};

// Update an existing protein item by ID
const updateProteinById = async (req, res) => {
  try {
    const protein = await Protein.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!protein) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', protein });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete an existing protein item by ID
const deleteProteinById = async (req, res) => {
  try {
    const protein = await Protein.findByIdAndDelete(req.params.id);
    if (!protein) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  createProtein,
  getAllProteins,
  getProteinById,
  updateProteinById,
  deleteProteinById,
};
