
const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDB = require("./config/ownerdb");
const cors = require("cors");
require("dotenv").config();

// CONNECT DB
connectDB();

// CORRECT CORS SETUP — WORKS FOR VERCEL
const corsOptions = {
  origin: [
    "https://radar-shop-app.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// BUILT-IN MIDDLEWARE must come BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/owners"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/cart"));
app.use("/api", require("./routes/upload"));

// TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "Radar Shop Backend API running" });
});

// START SERVER (only once)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;


// app.post('/register', async (req, res) => {
//   try {
//     console.log("Register body:", req.body);
//     const { shopName, ownerName, email, phone, image_url, password } = req.body;

//     const hashed = await bcrypt.hash(password, 10);
//     const newOwner = await ownerModel.create({
//       shopName,
//       ownerName,
//       email,
//       phone,
//       image_url,
//       password: hashed
//     });

//     res.status(201).json({ message: "Shop registered", owner: newOwner });
//   } catch (err) {
//     console.error("Error registering shop:", err);
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// });


// // Register a new user
// app.post('/register-user', async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//      const hashed = await bcrypt.hash(password, 12);
//     // Save to DB
//     const newUser = await userModel.create({
//       name,
//       email,
//       phone,
//       password: hashed
//     });

//     res.json({ message: "User registered successfully", user: newUser });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });



// app.post('find-owner',async(req, res)=>{
//     const owner = await ownerModel.find();
//    res.send(owner);
//     })

// app.post('/add-product',async(req,res)=>{
//      const { shopId, productName, price, image_url } = req.body;
     
//     const shop = await ownerModel.findById(shopId);
//     shop.products.push({ productName, price, image_url });
//     await shop.save();
//     res.json({message:"product added",shop})
// })

// ✅ Delete a product from shop
// app.delete("/delete-product", async (req, res) => {
//   try {
//     const { shopId, productName } = req.body;

//     const shop = await ownerModel.findById(shopId);
//     if (!shop) return res.status(404).json({ error: "Shop not found" });

//     shop.products = shop.products.filter(
//       (p) => p.productName !== productName
//     );

//     await shop.save();
//     res.json({ message: "Product deleted successfully", shop });
//   } catch (err) {
//     console.error("Error deleting product:", err);
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// });

// ✅ Edit product details
// app.put("/edit-product", async (req, res) => {
//   try {
//     const { shopId, oldProductName, productName, price, image_url } = req.body;

//     const shop = await ownerModel.findById(shopId);
//     if (!shop) return res.status(404).json({ error: "Shop not found" });

//     const product = shop.products.find((p) => p.productName === oldProductName);
//     if (!product)
//       return res.status(404).json({ error: "Product not found" });

//     product.productName = productName;
//     product.price = price;
//     product.image_url = image_url;

//     await shop.save();
//     res.json({ message: "Product updated successfully", shop });
//   } catch (err) {
//     console.error("Error editing product:", err);
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// });



// ✅ Edit user details
// app.put("/edit-user", async (req, res) => {
//   try {
//     const { userId, name, email, phone, password } = req.body;

//     const user = await userModel.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     user.name = name;
//     user.email = email;
//     user.phone = phone;
//     if (password && password.trim() !== "") {
//       user.password = await bcrypt.hash(password, 10);
//     }
//     await user.save();

//     res.json({ message: "User updated successfully", user });
//   } catch (err) {
//     console.error("Error updating user:", err);
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// });



// ✅ Edit owner details
// app.put("/edit-owner", async (req, res) => {
//   try {
//      console.log("Received edit-owner body:", req.body);
//     const { ownerId, shopName, ownerName, email, phone, image_url, password } = req.body;

//     const owner = await ownerModel.findById(ownerId);
//     if (!owner) return res.status(404).json({ error: "Owner not found" });

//     owner.shopName = shopName;
//     owner.ownerName = ownerName;
//     owner.email=email;
//     owner.phone=phone;
//     owner.image_url = image_url;
//     if (password && password.trim() !== "") {
//       owner.password = await bcrypt.hash(password, 10);
//     }

//     await owner.save({ validateBeforeSave: false });

//     res.json({ message: "Owner updated successfully", owner });
//   } catch (err) {
//     console.error("Error updating owner:", err);
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// });



// app.post('/login', async (req, res) => {
//   try {
//     const { ownerName, password } = req.body;
//     const owner = await ownerModel.findOne({ ownerName });
//     if (!owner) return res.status(401).json({ message: 'Invalid credentials' });

//     const match = await bcrypt.compare(password, owner.password);
//     if (!match) return res.status(401).json({ message: 'Invalid credentials' });

//     // preserve existing success response
//     return res.json({ success: true, owner });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });



// // ...existing code...
// app.post('/login-user', async (req, res) => {
//   try {
//     console.log('/login-user called with body:', req.body);
//     const { name, password } = req.body;
//     if (!name || !password) {
//       console.warn('Missing name or password in /login-user');
//       return res.status(400).json({ message: 'Missing credentials' });
//     }

//     const user = await userModel.findOne({ name });
//     if (!user) {
//       console.log('User not found for name:', name);
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     if (!user.password) {
//       console.warn('User record has no password field (id):', user._id);
//       return res.status(500).json({ message: 'Server error: user has no password' });
//     }

//     let match = false;
//     try {
//       match = await bcrypt.compare(password, user.password);
//     } catch (cmpErr) {
//       console.error('bcrypt.compare error:', cmpErr);
//       return res.status(500).json({ message: 'Server error' });
//     }

//     if (!match) {
//       console.log('Password mismatch for user:', name);
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Remove password before sending user object
//     const userSafe = user.toObject ? user.toObject() : { ...user };
//     if (userSafe.password) delete userSafe.password;

//     return res.json({ success: true, user: userSafe });
//   } catch (err) {
//     console.error('Unhandled error in /login-user:', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });



// Add product to user's cart
// app.post('/add-to-cart', async (req, res) => {
//   try {
//     const { userName, shopName, productName, price, image_url } = req.body;

//     if (!userName || !shopName || !productName) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // find existing cart for user
//     let cart = await cartModel.findOne({ userName });

//     if (!cart) {
//       // create new cart for user
//       cart = await cartModel.create({
//         userName,
//         shops: [
//           {
//             shopName,
//             products: [{ productName, price, image_url }]
//           }
//         ]
//       });
//       return res.json({ message: "Cart created and product added", cart });
//     }

//     // find if shop already exists in user's cart
//     const existingShop = cart.shops.find((s) => s.shopName === shopName);

//     if (existingShop) {
//       // check if product already exists in that shop
//       const existingProduct = existingShop.products.find(
//         (p) => p.productName === productName
//       );
//       if (!existingProduct) {
//         existingShop.products.push({ productName, price, image_url });
//       }
//     } else {
//       // add new shop to cart
//       cart.shops.push({
//         shopName,
//         products: [{ productName, price, image_url }]
//       });
//     }

//     await cart.save();
//     res.json({ message: "Product added to cart", cart });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// });

// Get user's cart
// ✅ Get user's cart (fixed)
// app.get('/get-cart/:userName', async (req, res) => {
//   try {
//     const { userName } = req.params;

//     const cart = await cartModel.findOne({ userName });

//     if (!cart) {
//       // return a consistent empty structure
//       return res.status(200).json({
//         userName,
//         shops: [],
//         message: "Cart is empty",
//       });
//     }

//     // success — send the full cart
//     res.status(200).json({
//       userName: cart.userName,
//       shops: cart.shops,
//     });
//   } catch (err) {
//     console.error("Error fetching cart:", err);
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// });

// // ✅ Remove product from user's cart
// app.delete('/remove-from-cart', async (req, res) => {
//   try {
//     const { userName, shopName, productName } = req.body;

//     if (!userName || !shopName || !productName) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Find user's cart
//     const cart = await cartModel.findOne({ userName });
//     if (!cart) return res.status(404).json({ error: "Cart not found" });

//     // Find the shop inside the cart
//     const shop = cart.shops.find(s => s.shopName === shopName);
//     if (!shop) return res.status(404).json({ error: "Shop not found in cart" });

//     // Filter out the product
//     shop.products = shop.products.filter(p => p.productName !== productName);

//     // If shop has no products left, remove shop entirely
//     cart.shops = cart.shops.filter(s => s.products.length > 0);

//     await cart.save();

//     res.json({ message: "Product removed successfully", cart });
//   } catch (err) {
//     console.error("Error removing product:", err);
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// });



























































