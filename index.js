const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Trail = require("./models/trail");
const path = require("path");
const ejsMate = require("ejs-mate"); 
const trailRouter = require("./routes/trails");
const commentRouter = require("./routes/comments");
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

//Routers
app.use("/trails", trailRouter);
app.use("/", commentRouter);

app.listen(8000, () => {
  console.log("Listening on port 3000");
});

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});