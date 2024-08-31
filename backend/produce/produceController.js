// produce controller
const mongoose = require('mongoose');
const Produce = require('./produceModel');

// Create a new produce item
const createProduce = async (req, res) => {
  try {
    const produce = new Produce(req.body);
    await produce.save();
    res.status(201).json({ message: 'Product created successfully', produce });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Get all produce items
const getAllProduce = async (req, res) => {
  try {
    const produce = await Produce.find();
    res.status(200).json(produce);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Get a single produce item by ID
const getProduceById = async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id);
    if (!produce) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(produce);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};

// Update an existing produce by ID
const updateProduceById = async (req, res) => {
  try {
    const produce = await Produce.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!produce) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', produce });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete an existing produce by ID
const deleteProduceById = async (req, res) => {
  try {
    const produce = await Produce.findByIdAndDelete(req.params.id);
    if (!produce) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  createProduce,
  getAllProduce,
  getProduceById,
  updateProduceById,
  deleteProduceById,
};
