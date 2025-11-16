const ownerModel=require('../models/owner');
const userModel=require('../models/users');
const bcrypt=require('bcrypt');

exports.registerOwner = async (req, res) => {
  try {
    console.log("Register body:", req.body);
    const { shopName, ownerName, email, phone, image_url, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const newOwner = await ownerModel.create({
      shopName,
      ownerName,
      email,
      phone,
      image_url,
      password: hashed
    });

    res.status(201).json({ message: "Shop registered", owner: newOwner });
  } catch (err) {
    console.error("Error registering shop:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};


// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

     const hashed = await bcrypt.hash(password, 12);
    // Save to DB
    const newUser = await userModel.create({
      name,
      email,
      phone,
      password: hashed
    });

    res.json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};



exports.loginOwner = async (req, res) => {
  try {
    const { ownerName, password } = req.body;
    const owner = await ownerModel.findOne({ ownerName });
    if (!owner) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, owner.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    // preserve existing success response
    return res.json({ success: true, owner });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};



// ...existing code...
exports.loginUser = async (req, res) => {
  try {
    console.log('/login-user called with body:', req.body);
    const { name, password } = req.body;
    if (!name || !password) {
      console.warn('Missing name or password in /login-user');
      return res.status(400).json({ message: 'Missing credentials' });
    }

    const user = await userModel.findOne({ name });
    if (!user) {
      console.log('User not found for name:', name);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.password) {
      console.warn('User record has no password field (id):', user._id);
      return res.status(500).json({ message: 'Server error: user has no password' });
    }

    let match = false;
    try {
      match = await bcrypt.compare(password, user.password);
    } catch (cmpErr) {
      console.error('bcrypt.compare error:', cmpErr);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!match) {
      console.log('Password mismatch for user:', name);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Remove password before sending user object
    const userSafe = user.toObject ? user.toObject() : { ...user };
    if (userSafe.password) delete userSafe.password;

    return res.json({ success: true, user: userSafe });
  } catch (err) {
    console.error('Unhandled error in /login-user:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
