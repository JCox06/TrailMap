const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Trail = require("./models/trail");
const path = require("path");
const ejsMate = require("ejs-mate"); 
mongoose.connect("mongodb://127.0.0.1:27017/trailmap", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected!");
});


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.listen(8000, () => {
  console.log("Listening on port 3000");
});

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

app.get("/trails", async (req, res) => {
  const trails = await Trail.find();
  res.render("trails/trails", { trails });
});

app.get("/trails/new", (req, res) => {
  res.render("trails/new");
});

app.get("/trails/:Tid", async (req, res) => {
  const { Tid } = req.params;
  const trail = await Trail.findById(Tid);
  res.render("trails/show", { trail });
});

app.post("/trails", async (req, res) => {
  console.log(req.body.trail);
  const { title, description, difficulty} = req.body.trail;

  const trail = new Trail({ title, description, difficulty});
  await trail.save();
  res.redirect("/trails");
});