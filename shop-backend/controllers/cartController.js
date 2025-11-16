const cartModel = require('../models/cart');

exports.addToCart = async (req, res) => {
  try {
    const { userName, shopName, productName, price, image_url } = req.body;

    if (!userName || !shopName || !productName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // find existing cart for user
    let cart = await cartModel.findOne({ userName });

    if (!cart) {
      // create new cart for user
      cart = await cartModel.create({
        userName,
        shops: [
          {
            shopName,
            products: [{ productName, price, image_url }]
          }
        ]
      });
      return res.json({ message: "Cart created and product added", cart });
    }

    // find if shop already exists in user's cart
    const existingShop = cart.shops.find((s) => s.shopName === shopName);

    if (existingShop) {
      // check if product already exists in that shop
      const existingProduct = existingShop.products.find(
        (p) => p.productName === productName
      );
      if (!existingProduct) {
        existingShop.products.push({ productName, price, image_url });
      }
    } else {
      // add new shop to cart
      cart.shops.push({
        shopName,
        products: [{ productName, price, image_url }]
      });
    }

    await cart.save();
    res.json({ message: "Product added to cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userName } = req.params;

    const cart = await cartModel.findOne({ userName });

    if (!cart) {
      // return a consistent empty structure
      return res.status(200).json({
        userName,
        shops: [],
        message: "Cart is empty",
      });
    }

    // success — send the full cart
    res.status(200).json({
      userName: cart.userName,
      shops: cart.shops,
    });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userName, shopName, productName } = req.body;

    if (!userName || !shopName || !productName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find user's cart
    const cart = await cartModel.findOne({ userName });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    // Find the shop inside the cart
    const shop = cart.shops.find(s => s.shopName === shopName);
    if (!shop) return res.status(404).json({ error: "Shop not found in cart" });

    // Filter out the product
    shop.products = shop.products.filter(p => p.productName !== productName);

    // If shop has no products left, remove shop entirely
    cart.shops = cart.shops.filter(s => s.products.length > 0);

    await cart.save();

    res.json({ message: "Product removed successfully", cart });
  } catch (err) {
    console.error("Error removing product:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

