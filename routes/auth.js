const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");



// router.post("/login", async (req, res) => {
//   const { email, password } = req.body.auth;
//   const user = await User.findOne({ email });
//   if (! user) {
//     req.flash("error", "User name or password is incorrect. Please try again");
//     res.redirect("/auth");
//     return;
//   }
//   const result = await user.authenticate(password);
//   if (result) {
//     req.session.user = user._id;
//     req.flash("message", "Welcome back to TrailMap");
//     res.redirect("/trails");  
//   } else {
//     req.flash("error", "User name or password is incorrect. Please try again");
//     res.redirect("/auth");
//   }
// });

// router.post("/signup", async (req, res) => {
//   const user = new User(req.body.auth); 
//   await user.runhash();
//   req.session.user = user._id;
//   req.flash("message", "Thanks for creating your account. You can now participate in the community!");
//   res.redirect("/trails");
// });





router.get("/login", (req, res) => {
  res.render("login"); 
});


router.get("/signup", (req, res) => {
  res.render("signup");
});


// router.post("/login", async (req, res) => {
//   passport.authenticate("local", {
//     failureFlash: true,
//     failureRedirect: "/auth/login"
//   }, (req, res) => {
//     req.flash("message", "Welcome back");
//     req.redirect("/trails");
//   });
// });


router.post("/login", passport.authenticate("local", {
  failureFlash: true,
  failureRedirect: "/auth/login"
}), (req, res) => {
  req.flash("message", "Welcome back to TrailMap");
  res.redirect("/trails");
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, gender, location, password } = req.body;
    const user = new User({ username, email, gender, location });
    const setupUser = await User.register(user, password);

    req.login(setupUser, err => {
      if (err) {
        throw new Error();
      } else {
        req.flash("message", "Welcome to TrailMap");
        res.redirect("/trails");
      }
    })
  } catch (error) {
    req.flash("error", "Error during account creation");
    res.redirect("/auth");
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("message", "Successfully logged you out. You can close this window");
  res.redirect("/auth/login");
});



module.exports = router;