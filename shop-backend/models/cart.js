const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  image_url: String
});

const shopCartSchema = new mongoose.Schema({
  shopName: String,
  products: [productSchema]
});

const cartSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  shops: [shopCartSchema]
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
