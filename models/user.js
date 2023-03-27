const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [40, "name should be under 40 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate: [validator.isEmail, "please enter email in correct formate"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "pasword should be atleast 6 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  photo: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//pass encry before save (pre events)

userSchema.pre("save", async function (next) {
  //it prevent unchanged pass encryption
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
//validate pass
userSchema.methods.isValidatedPassword = async function (userEnteredPass) {
  return await bcrypt.compare(userEnteredPass, this.password);
};

//create and return jwt
userSchema.methods.getJwtToken = function () {
  //this._id is given by mongodb
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//generate forgot password token
userSchema.methods.getForgetPAsswordToken = function () {
  //generate random string
  const forgotToken = crypto.randomBytes(20).toString("hex");

  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hax");

  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

  return forgotToken;
};

module.exports = mongoose.model("User", userSchema);
