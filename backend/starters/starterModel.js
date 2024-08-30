// starter/schema
const mongoose = require('mongoose');

// Define the options schema
const optionSchema = new mongoose.Schema(
  {
    quantity: {
      type: String,
      required: false,
    },
    sauce: {
      type: String,
      required: false,
    },
    choices: {
      type: [String],
      required: false,
    },
    method: {
      type: String,
      required: false,
    },
  },
  { _id: false }
);

const starterSchema = new mongoose.Schema(
  {
    category: String,
    name: String,
    image: String,
    description: String,
    price: String,
    count: String,
    par: String,
    projected: String,
    actual: String,
    date: String,
    time: String,
    sold: String,
    options: [optionSchema],
  },
  {
    timestamps: true,
  }
);

const Starter = mongoose.model('Starter', starterSchema);

module.exports = Starter;
