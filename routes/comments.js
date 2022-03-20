const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");
const Trail = require("../models/trail");
const middleware = require("../middleware");
const User = require("../models/user");

router.post("/trails/:Tid/comment", middleware.isLoggedIn ,async (req, res) => {
  const { rating, text } = req.body.comment;
  const author = await User.findById(req.session.user);
  const comment = new Comment({ rating, text, author});
  const { Tid } = req.params;
  const activeSite = await Trail.findById(Tid); 

  activeSite.comments.push(comment);
  await comment.save();
  await activeSite.save();
  res.redirect(`/trails/${activeSite._id}`);
});


module.exports = router;