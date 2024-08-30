// starter/schema
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
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
// Middleware to generate sales data before saving
starterSchema.pre('save', function (next) {
  const now = new Date();
  const currentHour = now.getHours();

  if (currentHour >= 11 && currentHour <= 21) {
    this.sold = faker.datatype
      .float({
        min: 100,
        max: 500,
        precision: 0.01,
      })
      .toFixed(2);
  } else {
    this.sold = '0.00';
  }

  next();
});

const Starter = mongoose.model('Starter', starterSchema);

module.exports = Starter;
