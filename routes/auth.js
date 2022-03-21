const express = require("express");
const router = express.Router();
const User = require("../models/user");


router.get("/", (req, res) => {
  res.render("auth"); 
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body.auth;
  const user = await User.findOne({ email });
  if (! user) {
    req.flash("error", "User name or password is incorrect. Please try again");
    res.redirect("/auth");
    return;
  }
  const result = await user.authenticate(password);
  if (result) {
    req.session.user = user._id;
    req.flash("message", "Welcome back to TrailMap");
    res.redirect("/trails");  
  } else {
    req.flash("error", "User name or password is incorrect. Please try again");
    res.redirect("/auth");
  }
});

router.post("/signup", async (req, res) => {
  const user = new User(req.body.auth); 
  await user.runhash();
  req.session.user = user._id;
  req.flash("message", "Thanks for creating your account. You can now participate in the community!");
  res.redirect("/trails");
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  req.flash("message", "You have successfully signed out");
  res.redirect("/auth");
});

module.exports = router;