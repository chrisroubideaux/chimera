// starter/schema
const mongoose = require('mongoose');

// Define the options schema
const optionSchema = new mongoose.Schema(
  {
    quantity: {
      type: String,
      required: false, // Optional field
    },
    sauce: {
      type: String,
      required: false, // Optional field
    },
    choices: {
      type: [String], // Array of strings
      required: false, // Optional field
    },
    method: {
      type: String,
      required: false, // Optional field
    },
  },
  { _id: false }
); // Disable _id for subdocuments

const starterSchema = new mongoose.Schema(
  {
    item: String,
    category: String,
    price: String,
    count: String,
    par: String,
    projected: String,
    actual: String,
    sold: String,
    date: String,
    time: String,
    options: [optionSchema], // Add options array to the schema
  },
  {
    timestamps: true,
  }
);

const Starter = mongoose.model('Starter', starterSchema);

module.exports = Starter;
