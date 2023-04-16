const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/user");
const {
  sendPaymentKey,
  capturePayment,
} = require("../controllers/paymentController");

router.route("/paymentkey").get(isLoggedIn, sendPaymentKey);
router.route("/payment").post(isLoggedIn, capturePayment);

module.exports = router;
