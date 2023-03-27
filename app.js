const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
//swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cookie and filkeupload
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
//temp check
app.set("view engine", "ejs");
//morgan logger
app.use(morgan("tiny"));

//routes

const home = require("./routes/home");
const user = require("./routes/user");

//router middlewares

app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/signuptest", (req, res) => {
  res.render("signuptest");
});

module.exports = app;
