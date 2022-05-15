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
const homeRouter = require("./routes/home")
const middleware = require("./middleware");
const flash = require("express-flash");

const passport = require("passport");
const localPassport = require("passport-local");
const User = require("./models/user")

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
app.use(middleware.addFlashMessages);


//New Authentication 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localPassport(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(middleware.addUserLocal);

//Routers
app.use("/trails", trailRouter);
app.use("/", commentRouter);
app.use("/auth", authRouter);
app.use("/", homeRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});


app.use((req, res) => {
  console.log(`User ID: ${ req.user }` );
});