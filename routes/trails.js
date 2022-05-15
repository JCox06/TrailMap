const express = require("express");
const router = express.Router();
const Trail = require("../models/trail");
const middleware = require("../middleware");
const User = require("../models/user");

router.get("/", async (req, res) => {
  const trails = await Trail.find();
  res.render("trails/trails", { trails });
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("trails/new");
});

router.get("/:Tid", async (req, res) => {
  const { Tid } = req.params;
  const trail = await Trail.findById(Tid)
    .populate({
      path: "comments",
      populate: { path: "author" }
    })
    .populate("author");
  res.render("trails/show", { trail });
});

router.get("/:Tid/steps", async (req, res) => {
  const { Tid } = req.params;
  const trail = await Trail.findById(Tid);
  res.send(trail.steps);
});

router.get("/:Tid/edit", middleware.isLoggedIn, middleware.validateTrailAuthor, async (req, res) => {
  const { Tid } = req.params;
  const trail = await Trail.findById(Tid);
  res.render("trails/edit", { trail });
});

router.post("/", middleware.isLoggedIn, async (req, res) => {
  const { title, description, difficulty} = req.body.trail;
  const steps = req.body.trail.step;
  const author = req.user;
  
  const trail = new Trail({ title, description, difficulty, author });
  
  for (let s of steps) {
    trail.steps.push({
      text: s
    });
  }

  await trail.save();
  res.redirect("/trails");
});

router.delete("/:Tid", middleware.isLoggedIn, middleware.validateTrailAuthor, async (req, res) => {
  const { Tid } = req.params;
  const trail = await Trail.findById(Tid);
  await trail.delete();
  res.redirect("/trails")
});

router.put("/:Tid", middleware.isLoggedIn, middleware.validateTrailAuthor,  async (req, res) => {

  const { Tid } = req.params;
  const { description, difficulty } = req.body.trail;
  const trail = await Trail.findById(Tid);
  trail.description = description;
  trail.difficulty = difficulty;
  

  const steps = req.body.trail.step;
  trail.steps = [];

  for (let s of steps) {
    trail.steps.push({
      text: s
    });
  }

  await trail.save();
  res.redirect(`/trails/${Tid}`);
});

module.exports = router;