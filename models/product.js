const mongoose = require("mongoose");

/**
 * name
 * price
 * description
 * photos[]
 * category
 * gender
 * brand
 * stock
 * sizes
 * rating
 * noOfreviews
 * reviews [user,name,rating,comment]
 * user
 * createdAt
 *
 */

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide product name"],
    trim: true,
    maxlength: [120, "Product name should not be more than 120 characters"],
  },
  price: {
    type: Number,
    required: [true, "please provide product price"],
    maxlength: [6, "Product price should not be more than 6 digits"],
  },
  description: {
    type: String,
    required: [true, "please provide product description"],
  },
  photos: [
    {
      id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  sizes: [
    {
      type: String,
      required: [true, "Please select a size"],
    },
  ],
  category: {
    type: String,
    required: [
      true,
      "please select category ONLY from - casual, formal, sportswear & footwear",
    ],
    enum: {
      values: ["casual", "formal", "sportswear", "footwear"],
      message:
        "please select category ONLY from - casual, formal, sportswear & footwear",
    },
  },
  gender: {
    type: String,
    required: [true, "please select gender ONLY from - Men Women or unisex "],
    enum: {
      values: ["Men", "Women", "Women"],
      message: "please select gender ONLY from - Men, Women & Women",
    },
  },
  stock: {
    type: Number,
    required: [true, "please add a number in stock"],
  },
  brand: {
    type: String,
    required: [true, "please add a brand for clothing"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
