const mongoose = require("mongoose");

/**
 * name
 * price
 * description
 * photos[]
 * category
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
      "please select category ONLY from - plants, seeds, Pots & Planters, Plant care",
    ],
    enum: {
      values: ["plants", "seeds", "potsPlanters", "plantCare"],
      message:
        "please select category ONLY from - plants, seeds, Pots & Planters, Plant care",
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
