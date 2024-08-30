// Product schema/model
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
