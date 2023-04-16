const express = require("express");
const { oAuth } = require("../middlewares/user");
const passport = require("passport");
const cookieToken = require("../utils/cookieToken");
const router = express.Router();

router.route("/google").get(oAuth);
router
  .route("/google/callback")
  .get(passport.authenticate("google"), function (req, res) {
    cookieToken(req.user, res);
  });

module.exports = router;
