const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Trail = require("./models/trail");
const path = require("path");

mongoose.connect("mongodb://127.0.0.1:27017/trailmap", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected!");
});


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));


app.listen(8000, () => {
  console.log("Listening on port 3000");
});

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

app.get("/index", async (req, res) => {
  const trails = await Trail.find();
  res.render("trails", { trails });
});

async function addTrailTest() {
  const trail = new Trail({title: "This is the title", description: "This is the description"});
  console.log(trail);
  await trail.save();
  console.log("Added trail to the databse");
}
