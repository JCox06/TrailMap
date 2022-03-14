const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");
const Trail = require("../models/trail");

router.post("/trails/:Tid/comment", async (req, res) => {
  const { rating, text } = req.body.comment;
  const comment = new Comment({ rating, text });
  const { Tid } = req.params;
  const activeSite = await Trail.findById(Tid); 

  activeSite.comments.push(comment);
  await comment.save();
  await activeSite.save();
  res.redirect(`/trails/${activeSite._id}`);
});


module.exports = router;