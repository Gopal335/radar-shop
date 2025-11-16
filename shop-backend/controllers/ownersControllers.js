const ownerModel = require('../models/owner');

exports.findOwners =async(req, res)=>{
    const owner = await ownerModel.find();
   res.send(owner);
    }

exports.addProduct =async(req,res)=>{
     const { shopId, productName, price, image_url } = req.body;
     
    const shop = await ownerModel.findById(shopId);
    shop.products.push({ productName, price, image_url });
    await shop.save();
    res.json({message:"product added",shop})
}


exports.deleteProduct =  async (req, res) => {
  try {
    const { shopId, productName } = req.body;

    const shop = await ownerModel.findById(shopId);
    if (!shop) return res.status(404).json({ error: "Shop not found" });

    shop.products = shop.products.filter(
      (p) => p.productName !== productName
    );

    await shop.save();
    res.json({ message: "Product deleted successfully", shop });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { shopId, oldProductName, productName, price, image_url } = req.body;

    const shop = await ownerModel.findById(shopId);
    if (!shop) return res.status(404).json({ error: "Shop not found" });

    const product = shop.products.find((p) => p.productName === oldProductName);
    if (!product)
      return res.status(404).json({ error: "Product not found" });

    product.productName = productName;
    product.price = price;
    product.image_url = image_url;

    await shop.save();
    res.json({ message: "Product updated successfully", shop });
  } catch (err) {
    console.error("Error editing product:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.editOwner = async (req, res) => {
  try {
     console.log("Received edit-owner body:", req.body);
    const { ownerId, shopName, ownerName, email, phone, image_url, password } = req.body;

    const owner = await ownerModel.findById(ownerId);
    if (!owner) return res.status(404).json({ error: "Owner not found" });

    owner.shopName = shopName;
    owner.ownerName = ownerName;
    owner.email=email;
    owner.phone=phone;
    owner.image_url = image_url;
    if (password && password.trim() !== "") {
      owner.password = await bcrypt.hash(password, 10);
    }

    await owner.save({ validateBeforeSave: false });

    res.json({ message: "Owner updated successfully", owner });
  } catch (err) {
    console.error("Error updating owner:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};