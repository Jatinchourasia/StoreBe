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
app.use(fileUpload());
//morgan logger
app.use(morgan("tiny"));

//routes

const home = require("./routes/home");

//router middlewares

app.use("/api/v1", home);

module.exports = app;
