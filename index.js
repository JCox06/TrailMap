const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const path = require("path");
const ejsMate = require("ejs-mate"); 
const trailRouter = require("./routes/trails");
const commentRouter = require("./routes/comments");
const authRouter = require("./routes/auth");
const middleware = require("./middleware");
const flash = require("express-flash");

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

//MiddleWare
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 14,
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}));
app.use(flash());
app.use(middleware.addUserLocal);
app.use(middleware.addFlashMessages);

//Routers
app.use("/trails", trailRouter);
app.use("/", commentRouter);
app.use("/auth", authRouter);

app.listen(8000, () => {
  console.log("Listening on port 3000");
});

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});