const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const cookieToken = require("../utils/cookieToken");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, next) => {
      console.log("MY Profile", profile._json.email);
      try {
        const user = await User.findOne({ email: profile._json.email });
        if (user) {
          console.log("userAlready exist", user);
          next(null, user);
        } else {
          const user = await User.create({
            name: profile.displayName,
            email: profile._json.email,
            googleId: profile.id,
            password: profile.id,
            photo: {
              id: profile.id,
              secure_url: profile.photos[0].value,
            },
          });

          next(null, user);
        }
      } catch (err) {}
    }
  )
);
