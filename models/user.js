const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcryptjs");
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
  if (!this.isModefied("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
//validate pass
userSchema.methods.isValidatedPassword = async function (userEnteredPass) {
  return await bcrypt.compare(userEnteredPass, this.password);
};
module.exports = mongoose.model("User", userSchema);
