const express = require("express");
const router = express.Router();
const User = require("../models/user");


router.get("/", (req, res) => {
  res.render("auth"); 
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body.auth;
  const user = await User.findOne({ email });
  const result = await user.authenticate(password);
  if (result) {
    req.session.user = user._id;
  }
  res.redirect("/trails");
});

router.post("/signup", async (req, res) => {
  const user = new User(req.body.auth); 
  await user.save();
  req.session.user = user._id;
  res.redirect("/trails");
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/auth");
});

module.exports = router;