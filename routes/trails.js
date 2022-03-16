const express = require("express");
const router = express.Router();
const Trail = require("../models/trail");


router.get("/", async (req, res) => {
  const trails = await Trail.find();
  res.render("trails/trails", { trails });
});

router.get("/new", (req, res) => {
  res.render("trails/new");
});

router.get("/:Tid", async (req, res) => {
  const { Tid } = req.params;
  const trail = await Trail.findById(Tid).populate("comments");
  res.render("trails/show", { trail });
});

router.get("/:Tid/steps", async (req, res) => {
  const { Tid } = req.params;
  const trail = await Trail.findById(Tid);
  res.send(trail.steps);
});

router.get("/:Tid/edit", async (req, res) => {
  const { Tid } = req.params;
  const trail = await Trail.findById(Tid);
  res.render("trails/edit", { trail });
});

router.post("/", async (req, res) => {
  const { title, description, difficulty} = req.body.trail;
  
  const steps = req.body.trail.step;
  
  const trail = new Trail({ title, description, difficulty });
  
  for (let s of steps) {
    trail.steps.push({
      text: s
    });
  }

  await trail.save();
  res.redirect("/trails");
});

router.delete("/:Tid", async (req, res) => {
  const { Tid } = req.params;
  const trail = await Trail.findById(Tid);
  await trail.delete();
  res.redirect("/trails")
});

router.put("/:Tid", async (req, res) => {

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