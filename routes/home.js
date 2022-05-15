const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

router.get("/", (req, res) => {


  if (req.isAuthenticated()) {
    res.render("home/dashboard");
  } else {
    res.render("home/intro");
  }
});


module.exports = router;