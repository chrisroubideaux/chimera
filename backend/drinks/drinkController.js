// drink controller
const mongoose = require('mongoose');
const Drink = require('./drinkModel');

// Create a new bev item
const createDrink = async (req, res) => {
  try {
    const drink = new Drink(req.body);
    await drink.save();
    res.status(201).json({ message: 'Product created successfully', drink });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Get all bev items
const getAllDrinks = async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.status(200).json(drinks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Get a single bev item by ID
const getDrinkById = async (req, res) => {
  try {
    const drink = await Drink.findById(req.params.id);
    if (!drink) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(drink);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};

// Update an existing bev item by ID
const updateDrinkById = async (req, res) => {
  try {
    const drink = await Drink.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!drink) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', drink });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete an existing bev item by ID
const deleteDrinkById = async (req, res) => {
  try {
    const drink = await Drink.findByIdAndDelete(req.params.id);
    if (!drink) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  createDrink,
  getAllDrinks,
  getDrinkById,
  updateDrinkById,
  deleteDrinkById,
};
