const BigPromise = require("../middlewares/bigPromise");

exports.sendPaymentKey = BigPromise(async (req, res, next) => {
  res.status(200).json({
    paymentkey: process.env.PAYMENT_KEY_ID,
  });
});

exports.capturePayment = BigPromise(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.PAYMENT_KEY_ID,
    key_secret: process.env.PAYMENT_KEY_SECRET,
  });

  const Order = await instance.orders.create({
    amount: req.body.amount,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });

  res.status(200).json({
    success: true,
    amount: req.body.amount,
    order: Order,
  });
});
