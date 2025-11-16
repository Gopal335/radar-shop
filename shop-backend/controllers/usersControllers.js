const userModel = require('../models/users');

exports.editUser = async (req, res) => {
  try {
    const { userId, name, email, phone, password } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = name;
    user.email = email;
    user.phone = phone;
    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(password, 10);
    }
    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

