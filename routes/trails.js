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

module.exports = router;