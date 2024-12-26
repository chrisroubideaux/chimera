// lienen schema
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const linenSchema = new mongoose.Schema(
  {
    category: String,
    name: String,
    image: String,
    description: String,
    price: String,
    unit: String,
    perUnit: String,
    weight: String,
    count: String,
    sold: String,
    par: String,
    projected: String,
    actual: String,
    date: String,
    time: String,
  },
  {
    timestamps: true,
  }
);
// Middleware to generate sales data before saving
linenSchema.pre('save', function (next) {
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

const Linen = mongoose.model('Linen', linenSchema);

module.exports = Linen;
