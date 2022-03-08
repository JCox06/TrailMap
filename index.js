const express = require("express");
const app = express();


app.listen(8000, () => {
  console.log("Listening on port 3000");
});

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});