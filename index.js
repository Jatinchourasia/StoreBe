const connectWithDb = require("./config/db");
require("dotenv").config();
const cloudinary = require("cloudinary");
const app = require("./app");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 4000;

connectWithDb().then(() => {
  app.listen(PORT, () => console.log(`server running in ${PORT}`));
});
