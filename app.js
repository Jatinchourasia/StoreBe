const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
//swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
//oauth
const passportConfig = require("./passport/passport");
const passport = require("passport");

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
app.use(morgan("tiny"));

const session = require("express-session");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//routes

const home = require("./routes/home");
const user = require("./routes/user");
const product = require("./routes/product");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");

//router middlewares

app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/auth", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);

app.use("/signuptest", (req, res) => {
  res.render("signuptest");
});

module.exports = app;
