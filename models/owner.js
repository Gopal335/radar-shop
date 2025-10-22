const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [2, 'Product name must be at least 2 characters long'],
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: Number.isFinite,
      message: 'Price must be a valid number'
    }
  },
  image_url: {
    type: String,
    trim: true,
    // validate: {
    //   validator: function (v) {
    //     return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
    //   },
    //   message: props => `${props.value} is not a valid image URL`
    // }
  }
});

// Define shop owner schema
const ownerSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: [true, 'Shop name is required'],
    trim: true,
    minlength: [2, 'Shop name must be at least 2 characters long']
  },
  ownerName: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true,
    minlength: [2, 'Owner name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        // Allows +countrycode and 10–15 digits
        return /^\+?\d{10,15}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number`
    }
  },
  image_url: {
    type: String,
    trim: true,
    // validate: {
    //   validator: function (v) {
    //     return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
    //   },
    //   message: props => `${props.value} is not a valid image URL`
    // }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: function (v) {
        // Example: at least 1 uppercase, 1 lowercase, 1 number
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
      },
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }
  },
  products: {
    type: [productSchema],
    validate: {
      validator: function (arr) {
        return Array.isArray(arr);
      },
      message: 'Products must be an array'
    },
    default: []
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create model
const ownerModel = mongoose.model('Owner', ownerSchema);

module.exports = ownerModel;
