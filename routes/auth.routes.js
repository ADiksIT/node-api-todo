const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post("/register_login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: "No user found(Check your password)" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).json({ user: user.login, id: user._id });
    });
  })(req, res, next);
});

module.exports = router;
