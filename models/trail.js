const mongoose = require("mongoose");

const TrailSchema = new mongoose.Schema({
  title: String,
  description: String
});

const Trail = mongoose.model("Trail", TrailSchema);
module.exports = Trail;
